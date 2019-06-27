const validateInput = (input) => {
    return new Promise((resolve, rejecct) => {
        if (!input) {
            const error = new Error('EMPTY_INPUT')
            console.error(`Input seems to be empty. Please enter an input`, error)
            return reject(error)
        }
        if (typeof input !== "object" && input === null) {
            const error = new Error('INVALID_INPUT')
            console.error(`Input seems the input is not a valid js object. Please enter an valid input`, error)
            return reject(error)
        }
        return resolve()
    })
}

const render = (type, result, input) => {
    switch (type) {
        case 'result':
            document.getElementById('input').innerHTML = JSON.stringify(input, null, 2)
            document.getElementById('result').innerHTML = JSON.stringify(result, null, 2)
            break
        case 'error':
            document.getElementById('error').innerHTML = JSON.stringify(result, null, 2)
            break
    }
}

const convertObjToRequiredFormat = (entity) => {
    const convertedObj = []
    for (const key in entity) {
        const keys = []
        let value
        if (entity.hasOwnProperty(key)) {
            const element = entity[key]
            keys.push(key)
            if (typeof element === "object" && !Array.isArray(element)) {
                const respone = convertObjToRequiredFormat(element)
                respone.forEach((everyEntity) => {
                    const pathCopy = deepCopy(keys)
                    Array.prototype.push.apply(pathCopy, everyEntity.key)
                    value = everyEntity.value
                    convertedObj.push({
                        key: pathCopy,
                        value
                    })
                })
            } else {
                value = element
                convertedObj.push({
                    key: keys,
                    value
                })
            }
        }
    }
    return convertedObj
}

const startFlatteningObjects = (input) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = []
            if (Array.isArray(input)) {
                const noOfObjects = input.length
                for (let index = 0; index < noOfObjects; index++) {
                    const element = input[index]
                    response.push(convertObjToRequiredFormat(element))
                }
            } else {
                response = convertObjToRequiredFormat(input)
            }
            resolve(response)
        } catch (error) {
            console.error('error while flattening the objects ', error)
        }
    })
}
const flattenObject = async (input) => {
    try {
        await validateInput(input)
        const flattenObj = await startFlatteningObjects(input)
        render('result', flattenObj, input)
    } catch (error) {
        console.error('Error while converting js Object to flatten Object', error)
        render('error', error, input)
    }
}

flattenObject(input1)