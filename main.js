var app = new Vue({
    el: '#app',
    props: {
        stock: false
    },
    data: {
        product: "Socks",
        link: "https://google.com",
        quantity: 50,
        brand: 'Noski',
        selectedVariant: 0, // присваиваем индекс для вариантов товара (в вычисляемых функциях обрабатываем по индексу - картинка/количество/наличие и тд)
        details: ['80% cotton', '20% polyester', 'male/female'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'red',
                variantQuantity: 9,
                variantImage: "assets/red.jpeg",
                variantSize: ['S', 'M', 'L', 'XL'],
                onSale: true,
            },
            {
                variantId: 2235,
                variantColor: 'yellow',
                variantQuantity: 11,
                variantImage: "assets/socks.jpg",
                variantSize: ['L', 'XL'],
                onSale: false,
            },
            {
                variantId: 2236,
                variantColor: 'green',
                variantQuantity: 0,
                variantImage: "assets/green.jpg",
                variantSize: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
                onSale: false,
            }
        ],
        cart: 0,
    },
    methods: {
        //методы
        addToCart() {
            let qty = this.variants[this.selectedVariant].variantQuantity
            this.cart += 1
            if (this.cart === qty) {
                this.stock = true
            }
        },
        removeFromCart() {
            this.cart -= 1
            this.stock = false
            if (this.cart < 1) {
                this.cart = 0
                this.stock = false
            }
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },

    },
    computed: {   //вычисляемые функции
        title() {
            return '"' + this.brand+ '"' + ' ' + this.product;
        },
        newStock: {
            get: function() { console.log('ky-ky')
                let qty = this.variants[this.selectedVariant].variantQuantity
                if(qty === 0 || this.cart === qty) {
                    return this.stock = true
                } else {
                    return this.stock = false
                }
            },
            set: function(newValue) { console.log('ku-ku')
                if(this.variants[this.selectedVariant].variantQuantity === 0) {
                    return this.stock(true, newValue)
                } else {
                    return this.stock(false, newValue)
                }
            },
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock(){
               let qty =  this.variants[this.selectedVariant].variantQuantity
                if(qty >10)
                    return qty +' pcs'
                else if (qty <= 10 && qty > 0)
                    return qty + ' pcs left'
                else
                    return 'Out of stock'
        },
        sizes() {
            return this.variants[this.selectedVariant].variantSize
        },
        sale() {
            if (!this.variants[this.selectedVariant].onSale) {
                return {
                    text: 'are not on sale',
                    style: 'text-decoration: line-through;text-transform:uppercase; color:#333'
                }
            } else {
                return {
                    text:'are on sale!',
                    style:'border: 1px solid red; color: red; text-transform: uppercase;display: flex;align-items: center;font-weight: bold;'
                }
            }
        },
    }
})