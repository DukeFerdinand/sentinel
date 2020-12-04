use serde::{Serialize, Deserialize};
use crate::schema::users;

#[table_name="users"]
#[derive(Debug, Queryable, Insertable, Serialize, Deserialize)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub first_name: String,
    pub last_name: String
}

#[table_name="users"]
#[derive(Debug, Insertable, Serialize, Deserialize)]
pub struct UserInput {
    pub username: String,
    pub email: String,
    pub first_name: String,
    pub last_name: String
}
