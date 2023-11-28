export interface UserSignUp {
  name: string;
  username: string;
  email: string;
  password: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      long: string
    }
  }
  phone: string;
  website: string;
}
