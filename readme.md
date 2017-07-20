### To repeat this yourself:
1. Update knexfile.js with your own postgres settings
2. Update index.js with your own postgres settings
3. `npm i`
4. `knex migrate:latest`
5. `node index.js`

### results
```
Begin UUID insertion
UUID insertion complete in 57158ms
Begin intId insertion
intId insertion complete in 51895ms
Begin intId reads
intId reads complete in 45339ms
Begin Uuid reads
Uuid reads complete in 45796ms
```