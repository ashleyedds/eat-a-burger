const connection = require("./connection.js");

function objToSql(ob) {
    let arr = [];
    for (let key in ob) {
      let value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
}

function printQuestionMarks(num) {
    let arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }

const orm = {
    selectAll: function(tableInput, cb) {
        const queryString = "SELECT * FROM "  + tableInput + ";";
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    insertOne: function(tableInput, column, value) {
        const query = "INSERT INTO " + tableInput + "(" + column + ") VALUES (?);";

        console.log(query);

        connection.query(query, [value], (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    updateOne:function(table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table;
    
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
    
        console.log(queryString);
    
        connection.query(queryString, vals, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      },
}

module.exports = orm;