const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cookieSession = require("cookie-session");

const app = express();

// Configure passport
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "670371316064-si0bgio6mktub8c1n0fqlbjak9q29oa6.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle user data and authentication logic here
      console.log(profile);
    }
  )
);

// Configure cookie session
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["mohiuddin"],
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google"),
//   (req, res, next) => {
//     console.log(req.user, req.isAuthenticated());
//     res.redirect("http://localhost:3000/");
//     // res.send("user is logged in");
//   }
// );

app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    // Redirect or respond with success message
    // res.redirect("/");

    console.log("fjklsfjklf");
  }
);

app.get("/api/logout", (req, res) => {
  req.logout();
  // Redirect or respond with success message
  res.send("Logged out successfully");
});

app.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

app.get("/", (req, res) => {
  res.send("Server Running");
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
