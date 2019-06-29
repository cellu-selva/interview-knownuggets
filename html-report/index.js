const render = (string, domSelector) => {
    if(domSelector === 'result'){
        doc = new DOMParser().parseFromString(string, "text/xml");
        document.getElementById(domSelector).innerHTML = string
    } else {
        document.getElementById(domSelector).innerHTML = JSON.stringify(string, null, 2)
    }
}

const findIfAlreadyProcessed = (processedEntity, column, value) => {
    return processedEntity[column] && processedEntity[column].indexOf(value) > -1
}

const constructHtmlTemplate = (input, config, headers) => {
   const inputLength = input.length
   let stringTemplate = `<table border="1"><thead>`
   headers.forEach(header => {
        stringTemplate = `${stringTemplate}<th> ${header}</th>`
    });
    let relatedData = []
    stringTemplate = `${stringTemplate}</thead><tbody>`
    const processData = {}
   for(let i=0; i<inputLength; i++) {
        const row = input[i]
        const configLength = config.length
        stringTemplate = `${stringTemplate}<tr>`
        for(let i=0; i<configLength; i++) {
            const { Merge, Column } = config[i]
            if(!processData[Column]) {
                processData[Column] = {
                    toSkip: "",
                    skipped: ""
                }
            }
            if (!relatedData.length) {
                relatedData = input.filter(entity => entity[Column] === row[Column])
            }
            let value = typeof Column === "string" ? row[Column] : Column(row)
            if(!Merge) {
                stringTemplate = `${stringTemplate}<td>${value}</td>`
            } else {
                if(!processData[Column].toSkip){
                    const rowspan = relatedData.filter((entity) => entity[Column] === value)
                    stringTemplate = `${stringTemplate}<td rowspan=${rowspan.length || '1'}>${value}</td>`
                    processData[Column] = {
                        toSkip: rowspan.length,
                        skipped: 1
                    }
                } else {
                    if(processData[Column].toSkip > processData[Column].skipped) {
                        processData[Column].skipped += 1
                        if(processData[Column].toSkip === processData[Column].skipped) {
                            processData[Column] = {
                                toSkip: "",
                                skipped: ""
                            }
                        }
                    } else {
                        processData[Column] = {
                            toSkip: "",
                            skipped: ""
                        }
                    }
                }
            }
        }
        stringTemplate = `${stringTemplate}</tr>`
        relatedData.splice(0)
   }
   stringTemplate = `${stringTemplate}</tbody></table>`
   return stringTemplate
}

const sortArrayByKey = (array, key) => {
    return array.sort((current, next) => {
        const elem1 = current[key]
        const elem2 = next[key]
        return ((elem1 < elem2) ? -1 : ((elem1 > elem2) ? 1 : 0))
    })
}
const processReportData = (input, config) => {
    const response = {}
    const headers = config.map(header => header.HeaderName)
    let sortedInput
    const inputLength = headers.length
    for (let index = 0; index < inputLength; index++) {
        const element = headers[index]
        sortedInput = sortArrayByKey(input, element)
        console.log(sortedInput)
    }
    const template = constructHtmlTemplate(sortedInput, config, headers)
    // haha(sortedInput, config)
    render(template, 'result')
    render(input, 'input')
}

processReportData(input, config)