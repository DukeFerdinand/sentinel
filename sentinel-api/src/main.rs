#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate diesel;

mod models;
mod structures;
mod schema;

use diesel::prelude::*;
use models::{User, UserInput};


#[database("sentinel_dev")]
#[derive(Deref)]
struct SentinelDB(diesel::PgConnection);

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}


// TODO: Clean up this function. It's very messy considering how little it does
#[post("/user/create", format = "json", data = "<user>")]
async fn create_user(conn: SentinelDB, user: String) -> String {
    use schema::users::dsl::*;
    let data = serde_json::from_str::<UserInput>(&user);

    if data.is_ok() {
        let test: String = conn.run(|c| {
            let res = diesel::insert_into(users)
                .values(data.unwrap())
                .get_result::<User>(c);

            if res.is_ok() {
                serde_json::to_string(&res.unwrap()).unwrap_or(String::from("{}"))
            } else {
                String::from(r#"{ "error": "Could not create user" }"#)
            }
        }).await;

        test
    } else {
        String::from(data.unwrap_err().to_string())
    }

}

#[launch]
fn rocket() -> rocket::Rocket {
    rocket::ignite().mount("/", routes![index, create_user]).attach(SentinelDB::fairing())
}