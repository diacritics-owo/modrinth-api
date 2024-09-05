pub use openapi::*;

#[cfg(test)]
mod tests {
  use super::*;

  #[tokio::test]
  async fn get_project() {
    let result =
      apis::projects_api::get_project(&apis::configuration::Configuration::default(), "sodium")
        .await
        .unwrap();

    assert_eq!(result.id, "AANobbMI");
  }
}
