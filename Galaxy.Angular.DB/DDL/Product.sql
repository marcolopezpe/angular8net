﻿CREATE TABLE [dbo].[Product]
(
	ProductId INT NOT NULL PRIMARY KEY IDENTITY,
	ProductName VARCHAR(250),
	ItemCost DECIMAL (30,6)
)
