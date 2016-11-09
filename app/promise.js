/**
 * Created by trkmn27 on 07.11.2016.
 */

"use strict";

const _Promise = {

    all : function (promises) {
        return new Promise((resolve, reject) => {
            let succeed = [];
            let successCounter = 0;
            promises.forEach(function (promise, index) {
                promise
                    .then(function (data) {
                        succeed[index] = data;
                        successCounter++;
                        if (successCounter === promises.length) {
                            resolve(succeed);
                        }
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        });
    },

    race : function (promises) {
        return new Promise((resolve, reject) => {
            promises.forEach(function (promise) {
                promise
                    .then(function (data) {
                        resolve(data);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        });
    }
};

module.exports = _Promise;
