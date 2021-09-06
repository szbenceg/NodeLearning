const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { Logger } = require('mongodb');
const user = require('./models/user');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('6134d309e59d100f0d3b6eae')
        .then(user => {
            console.log(user)
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err)
        })
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
    .connect(
        'mongodb+srv://learning:learning@blearn.vg6gu.mongodb.net/databaseName?retryWrites=true&w=majority'
    )
    .then(result => {
        User.findOne().then(user => {
            if(!user){
                const user = new User({
                    name: 'Bence2',
                    email: 'email@email.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        });
        
        app.listen(3000);
    })
    .catch(err => {
        console.log(err)
    });
