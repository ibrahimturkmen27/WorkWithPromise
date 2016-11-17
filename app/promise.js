/**
 * Created by trkmn27 on 17.11.2016.
 */

"use strict";
const _Promise = {
    all : function (promises) {
        return new Promise((resolve, reject) => {
            let succeed = [];
            let successCounter = 0;
            let isRejected = false;
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
                        if (!isRejected) {
                            isRejected = true;
                            reject(error);
                        }
                    });
            });
        });
    },

    race : function (promises) {
        return new Promise((resolve, reject) => {
            let isSettled = false;
            promises.forEach(function (promise) {
                promise
                    .then(function (data) {
                        if (!isSettled) {
                            isSettled = true;
                            resolve(data);
                        }
                    })
                    .catch(function (error) {
                        if (!isSettled) {
                            isSettled = true;
                            reject(error);
                        }
                    });
            });
        });
    }
};

module.exports = _Promise;