mydata <- read.csv("./10yearAUSOpenMatches_Data.csv", header=TRUE)#, 
#sep=",", row.names="id")

#subset1 = mydata[c('round' == 'Final', 'winner')]

Final = sqldf("select * from mydata where round = 'Final'")
Semi = sqldf("select * from mydata where round = 'semi'")
Quarter = sqldf("select * from mydata where round = 'quarter'")
First = sqldf("select * from mydata where round = 'First'")
Second = sqldf("select * from mydata where round = 'Second'")
Third = sqldf("select * from mydata where round = 'Third'")
Fourth = sqldf("select * from mydata where round = 'Fourth'")


Y_2004 = sqldf("select * from mydata where year = 2004")
Y_2005 = sqldf("select * from mydata where year = 2005")
Y_2006 = sqldf("select * from mydata where year = 2006")
Y_2007 = sqldf("select * from mydata where year = 2007")
Y_2008 = sqldf("select * from mydata where year = 2008")
Y_2009 = sqldf("select * from mydata where year = 2009")
Y_2010 = sqldf("select * from mydata where year = 2010")
Y_2011 = sqldf("select * from mydata where year = 2011")
Y_2012 = sqldf("select * from mydata where year = 2012")
Y_2013 = sqldf("select * from mydata where year = 2013")
Y_2014 = sqldf("select * from mydata where year = 2014")

#write_json(path="./myjson.json", df_type = "values")

#player = sqldf("select * from mydata where player1 = 'Tommy Haas' or player2 = 'Tommy Haas'")


createJsonFiles <- function(year, dfyear) {
  
  jsonObj_year = jsonlite::toJSON(list(traits = names(dfyear), values = dfyear), pretty = TRUE)
  
  write(jsonObj_year, paste("Year_", toString(year), ".JSON", sep=""))
  
  q1 = paste("select * from  Y_", toString(year), " where round = 'First'", sep="")
  q2 = "select player1 as player, country1 as country from Y_year_First"
  q3 = "select player2 as player, country2 as country from Y_year_First"
  
  Y_year_First = sqldf(q1)
  Y_year_Players1 = sqldf(q2)
  Y_year_Players2 = sqldf(q3)
  Y_year_Players = rbind(Y_year_Players1, Y_year_Players2)
  jsonObj = jsonlite::toJSON(list(traits = names(Y_year_Players), values = Y_year_Players), pretty = TRUE)
  write(jsonObj, paste("Year_", toString(year), "_Players.json", sep=""))
  
}


#jsonObj_2004 = jsonlite::toJSON(list(traits = names(Y_2004), values = Y_2004), pretty = TRUE)

#write(jsonObj_2004, "Year_2004.JSON")

#Y_2004_First = sqldf("select * from Y_2004 where round = 'First'")
#Y_2004_Players1 = sqldf("select player1 as player, country1 as country from Y_2004_First")
#Y_2004_Players2 = sqldf("select player2 as player, country2 as country from Y_2004_First")
#Y_2004_Players = rbind(Y_2004_Players1, Y_2004_Players2)
#jsonObj = jsonlite::toJSON(list(traits = names(Y_2004_Players), values = Y_2004_Players), pretty = TRUE)
#write(jsonObj, "Year_2004_Players.json")

createJsonFiles(2004, Y_2004)
createJsonFiles(2005, Y_2005)



createJsonFiles(2006, Y_2006)
createJsonFiles(2007, Y_2007)
createJsonFiles(2008, Y_2008)
createJsonFiles(2009, Y_2009)
createJsonFiles(2010, Y_2010)
createJsonFiles(2011, Y_2011)
createJsonFiles(2012, Y_2012)
createJsonFiles(2013, Y_2013)
createJsonFiles(2014, Y_2014)



jsonObj = jsonlite::toJSON(list(traits = names(mydata), values = mydata), pretty = TRUE)
write(jsonObj, "All_Players.json")

