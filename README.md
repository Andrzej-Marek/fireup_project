# KeyWord Manager App

---

This is keyword manager app with tech stack:

- React
- Typescript
- Apollo server / client
- NodeJS
- TypeGraphQL
- Typegoose
- MongoDB

# Instalation

1. Pull git repo or download it ( You have 2 folders server and client keep them together!)
2. Go to folder with both folders and install dependencies with both. `npm install`
3. Go to server folder
4. In termin run commend `npm run start-both`
5. Here you go, both server and client are alive

   **Important**
   To run server in config folder create config file and create variables: ( mlab DB)
   For similar words you can use [datamuse API](https://www.datamuse.com/api/)

| Variable name          | Type                                  | Required |
| ---------------------- | :------------------------------------ | :------: |
| DB_NAME                | String: name of Your db               |   True   |
| DB_USER_NAME           | String: DB user name                  |   True   |
| DB_USER_PASSWORD       | String: DB user password              |   True   |
| DB_HOST                | String: DB host                       |   True   |
| SIMILAR_WORDS_ENDPOINT | String: endpoint for similar word api |   True   |
