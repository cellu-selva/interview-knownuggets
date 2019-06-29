var input = [{ "Organization": "Google", "UserId": "akumar", "UserName": "Ashok Kumar", "Department": "Sales", "Designation": "Sales", "CheckInTime": 1548909000000, "CheckOutTime": 1548945000000 }, { "Organization": "Google", "UserId": "akumar", "UserName": "Ashok Kumar", "Department": "Sales", "Designation": "Sales", "CheckInTime": 1549081800000, "CheckOutTime": 1549110600000 }, { "Organization": "FB", "UserId": "phanis", "UserName": "Phani Sai", "Department": "Sales", "Designation": "Sales", "CheckInTime": 1548909000000, "CheckOutTime": 1548945000000 }, { "Organization": "FB", "UserId": "phanis", "UserName": "Phani Sai", "Department": "Sales", "Designation": "Sales", "CheckInTime": 1549081800000, "CheckOutTime": 1549110600000 }, { "Organization": "FB", "UserId": "lakshmig", "UserName": "Laskhmi Gayathri", "Department": "Quality", "Designation": "QA Engineer", "CheckInTime": 1549081800000, "CheckOutTime": 1549110600000 }, { "Organization": "FB", "UserId": "lakshmig", "UserName": "Laskhmi Gayathri", "Department": "Quality", "Designation": "QA Engineer", "CheckInTime": 1549081800000, "CheckOutTime": 1549110600000 }]


const config = [{
    HeaderName: 'Organization',
    Column: 'Organization',
    Merge: true
}, {
    HeaderName: 'Department',
    Column: 'Department',
    Merge: true
}, {
    HeaderName: 'UserName',
    Column: 'UserName',
    Merge: true
}, {
    HeaderName: 'Date',
    Column: ({ CheckInTime }) => {
        return moment(CheckInTime).format("DD/MM/YYYY")
    },
    Merge: false
}, {
    HeaderName: 'Time',
    Column: ({ CheckInTime, CheckOutTime }) => {
        // Column can be a string or callback which can be called with the specific row record to get the computed column value.
        const secs = ((CheckOutTime - CheckInTime) / 1000)
        // TODO: Return in (x Hrs y Mins) format.
        return (secs / 60) + ' Mins' // Returning in minutes	
    },
    Merge: false
},
]