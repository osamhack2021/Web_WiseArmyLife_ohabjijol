"use strict";











function login() {
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application.json",
        },
        body: JSON.stringify(req),
        })
         .then((res) => res.json)
         .then((res) => {
        
          });
}