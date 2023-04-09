var sqlite3 = require('sqlite3').verbose()


const DBSOURCE = "db.sqlite"

const users = [
    {
      name: "Alice Smith",
      position: "Senior Software Engineer",
      office: "New York",
      age: 32,
      start_date: "2019-05-01",
      salary: 95000,
    },
    {
      name: "John Doe",
      position: "Marketing Manager",
      office: "Los Angeles",
      age: 38,
      start_date: "2018-01-15",
      salary: 120000,
    },
    {
      name: "Sarah Johnson",
      position: "Financial Analyst",
      office: "Chicago",
      age: 27,
      start_date: "2020-03-10",
      salary: 75000,
    },
    {
      name: "Michael Lee",
      position: "Sales Representative",
      office: "San Francisco",
      age: 25,
      start_date: "2021-01-01",
      salary: 60000,
    },
    {
      name: "Karen Rodriguez",
      position: "Human Resources Manager",
      office: "Houston",
      age: 41,
      start_date: "2017-06-20",
      salary: 110000,
    },
    {
      name: "David Kim",
      position: "Product Manager",
      office: "Seattle",
      age: 34,
      start_date: "2019-11-05",
      salary: 105000,
    },
    {
      name: "Emily Chen",
      position: "Graphic Designer",
      office: "Boston",
      age: 29,
      start_date: "2020-06-30",
      salary: 65000,
    },
    {
      name: "Daniel Baker",
      position: "Operations Manager",
      office: "Dallas",
      age: 43,
      start_date: "2016-09-15",
      salary: 125000,
    },
    {
      name: "Jessica Nguyen",
      position: "Accountant",
      office: "Phoenix",
      age: 31,
      start_date: "2018-03-12",
      salary: 80000,
    },
    {
      name: "Anthony Smith",
      position: "Customer Support Specialist",
      office: "Miami",
      age: 26,
      start_date: "2021-02-15",
      salary: 55000,
    },
    {
      name: "Melissa Davis",
      position: "Business Analyst",
      office: "Atlanta",
      age: 33,
      start_date: "2019-08-10",
      salary: 90000,
    },
    {
      name: "Kevin Lee",
      position: "IT Specialist",
      office: "Washington DC",
      age: 28,
      start_date: "2020-02-10",
      salary: 70000,
    },
    {
      name: "Jennifer Brown",
      position: "Executive Assistant",
      office: "Denver",
      age: 35,
      start_date: "2017-03-01",
      salary: 95000,
    },
    {
      name: "William Garcia",
      position: "Project Manager",
      office: "Philadelphia",
      age: 39,
      start_date: "2016-05-15",
      salary: 115000,
    },
    {
      name: "Alexandra Hernandez",
      position: "Software Developer",
      office: "Austin",
      age: 30,
      start_date: "2021-03-20",
      salary: 85000,
    },
    {
      name: "Ryan Taylor",
      position: "Sales Manager",
      office: "San Diego",
      age: 42,
      start_date: "2015-11-01",
      salary: 135000,
    },
    {
      name: "Elizabeth Kim",
      position: "Marketing Coordinator",
      office: "Portland",
      age: 27,
      start_date: "2020-09-01",
      salary: 60000,
    },
    {
      name: "Christopher Brown",
      position: "Product Designer",
      office: "Minneapolis",
      age: 29,
      start_date: "2019-04-05",
      salary: 80000,
    },
    {
      name: "Victoria Nguyen",
      position: "Data Analyst",
      office: "Charlotte",
      age: 28,
      start_date: "2020-01-10",
      salary: 75000,
    },
    {
      name: "Jonathan Davis",
      position: "Business Development Manager",
      office: "Raleigh",
      age: 36,
      start_date: "2018-07-01",
      salary: 100000,
    },
    {
      name: "Samantha Lee",
      position: "Social Media Manager",
      office: "Orlando",
      age: 31,
      start_date: "2017-02-15",
      salary: 90000,
    },
    {
      name: "Brandon Wilson",
      position: "Customer Success Manager",
      office: "Nashville",
      age: 33,
      start_date: "2019-01-01",
      salary: 95000,
    },
    {
      name: "Megan Martinez",
      position: "Public Relations Specialist",
      office: "Salt Lake City",
      age: 29,
      start_date: "2020-07-01",
      salary: 70000,
    },
  ];



let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            position text , 
            office text, 
            age integer,
            start_date text,
            salary int
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO user (name, position, office, age, start_date, salary) VALUES (?,?,?,?,?,?)'

                users.forEach((user)=>{
                    db.run(insert, [user.name,user.position,user.office,user.age,user.start_date,user.salary]) 
                })

                // db.run(insert, ["Alice","Senior Software Engineer","New York",32,"2019-05-01","2019-05-01"])
            }
        });  
    }
});


module.exports = db