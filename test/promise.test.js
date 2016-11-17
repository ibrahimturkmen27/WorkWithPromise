/**
 * Created by trkmn27 on 17.11.2016.
 */

"use strict";
const _Promise = require("./../app/promise");

describe("_Promise", () => {
    describe("all", () => {
        it("should reject the returned promise when the first promise get's rejected", () => {

            let promises = [
                Promise.reject(1),
                Promise.resolve(2),
                Promise.resolve(3)
            ];

            return _Promise.all(promises).then(() => {}).catch(error => expect(error).toEqual(1));
        });

        it("should reject the returned promise when the second promise get's rejected", () => {

            let promises = [
                Promise.resolve(1),
                Promise.reject(2),
                Promise.resolve(3)
            ];

            return _Promise.all(promises).then(() => {}).catch(error => expect(error).toEqual(2));
        });

        it("should reject the returned promise when the last promise get's rejected", () => {

            let promises = [
                Promise.resolve(1),
                Promise.resolve(2),
                Promise.reject(3)
            ];

            return _Promise.all(promises).then(() => {}).catch(error => expect(error).toEqual(3));
        });

        it("should resolve the returned promise when the all promises get's resolved", () => {

            let promises = [
                Promise.resolve(1),
                Promise.resolve(2),
                Promise.resolve(3)
            ];

            return _Promise.all(promises).then(result => expect(result).toEqual([1, 2, 3]));
        });

        it("should resolve the promise with the values ordered as the original promises " +
            "even if they resolve in a different order", () => {

            let promises = [
                new Promise((resolve) => { setTimeout(() => { resolve(1); }, 3000)}),
                new Promise((resolve) => { setTimeout(() => { resolve(2); }, 1000)}),
                new Promise((resolve) => { setTimeout(() => { resolve(3); }, 2000)})
            ];

            return _Promise.all(promises).then(result => expect(result).toEqual([1, 2, 3]));
        });
    });

    describe("race", () => {
        it("should resolve with the earliest promise that resolves", () => {

            let promises = [
                new Promise((resolve) => { setTimeout(() => { resolve(1); }, 3000)}),
                new Promise((resolve) => { setTimeout(() => { resolve(2); }, 1000)}),
                new Promise((resolve) => { setTimeout(() => { resolve(3); }, 2000)})
            ];

            return _Promise.race(promises).then(result => expect(result).toEqual(2)).catch(() => {});
        });

        it("should reject when the earliest promise rejects" , () => {

            let promises = [
                new Promise((resolve,reject) => { setTimeout(() => { reject(1); }, 1000)}),
                new Promise((resolve) => { setTimeout(() => { resolve(2); }, 3000)}),
                new Promise((resolve) => { setTimeout(() => { resolve(3); }, 2000)})
            ];

            return _Promise.race(promises).then(() => {}).catch(error => expect(error).toEqual(1));
        });

        it("should resolve when the earliest promise resolves" , () => {
            let promises = [
                new Promise((resolve,reject) => { setTimeout(() => { reject(1); }, 2000)}),
                new Promise((resolve,reject) => { setTimeout(() => { reject(2); }, 3000)}),
                new Promise((resolve) => { setTimeout(() => { resolve(3); }, 1000)})
            ];

            _Promise.race(promises).then(result => expect(result).toEqual(3));
        });
        it("should reject when the earliest promise rejects" , () => {

            let promises = [
                new Promise((resolve,reject) => { setTimeout(() => { reject(1); }, 2000)}),
                new Promise((resolve,reject) => { setTimeout(() => { reject(2); }, 1000)}),
                new Promise((resolve,reject) => { setTimeout(() => { reject(3); }, 2000)})
            ];

            _Promise.race(promises).then(() => {}).catch(error => expect(error).toEqual(2));
        });
    });
});