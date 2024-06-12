class HashMap {
    constructor(size) {
        this.table = new Array(size);
        this.size = size
        this.numOfItems = 0
        this.loadFactor = 0.8
    }
    hash(key) {
        let hashCode = 0
        let primeNum = 17
        for (let i = 0; i < key.length; i++) {
            hashCode = (hashCode * primeNum) + key.charCodeAt(i)
        }
        return hashCode % this.table.length
    }
    set(key, value) {
        const index = this.hash(key);
        if (!this.table[index]) {
            this.table[index] = []
        }
        let samekey = this.table[index].find(item => item[0] === key)
        if (samekey) {
            samekey[1] = value
        } else {
            this.table[index].push([key, value])
            this.numOfItems++
            if (this.numOfItems / this.table.length > this.loadFactor) {
                this.resize()
            }

        }

    }
    display() {
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i]) {
                console.log(i, this.table[i])
                // const items = this.table[i].map(item => `(${item[0]}: ${item[1]})`).join(', ');
                // console.log(`${i}: ${items}`);
            }
        }
    }
    get(key) {
        const index = this.hash(key)
        if (!this.table[index]) {
            return undefined
        }
        let samekey = this.table[index].find(item => item[0] === key)
        if (samekey) {
            return samekey[1]
        } else {
            return null
        }
    }
    length() {
        return this.numOfItems
    }
    keys() {
        let keysArr = []

        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i]) {
                for (let j = 0; j < this.table[i].length; j++) {
                    keysArr.push(this.table[i][j][0])
                }
            }
        }
        return keysArr
    }
    values() {
        let valsArr = []
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i]) {
                for (let j = 0; j < this.table[i].length; j++) {

                    valsArr.push(this.table[i][j][1])

                }
            }
        }
        return valsArr
    }
    remove(key) {
        const index = this.hash(key)
        if (!this.table[index]) {
            return undefined
        }
        let itemIndex = this.table[index].findIndex((item) => item[0] === key)
        if (itemIndex === -1) {
            return false
        } else {
            this.table[index].splice(itemIndex, 1)
            this.numOfItems--
            return true

        }
    }
    clear() {
        this.table = new Array(this.size)
        this.numOfItems = 0
    }
    resize() {
        const oldTable = this.table
        // this.size = this.size * 2
        this.numOfItems = 0
        this.table = new Array(this.size * 2)
        for (let i = 0; i < oldTable.length; i++) {
            if (oldTable[i]) {
                for (let j = 0; j < oldTable[i].length; j++) {
                    this.set(oldTable[i][j][0], oldTable[i][j][1])
                }
            }
        }
    }
}

const hashTable = new HashMap(3)
hashTable.set('name', 'Joy')
hashTable.set('age', 23)
hashTable.set('fruits', 203)

hashTable.set('parents', 1)

hashTable.display()
// console.log(hashTable.get('name'))
// console.log(hashTable.length())
// console.log(hashTable.keys())
// console.log(hashTable.values())
// console.log(hashTable.remove('age'))
// hashTable.display()
// hashTable.clear()
// hashTable.display()
console.log(hashTable.length())



