async function loadData() {

    const response = await fetch("data.json");

    const data = await response.json();

    //-----------------------------------
    // TASAS
    //-----------------------------------

    document.getElementById("cupCash").textContent = data.rates.cupCash;
    document.getElementById("cupCard").textContent = data.rates.cupCard;
    document.getElementById("clc").textContent = data.rates.clc;
    document.getElementById("prp").textContent = data.rates.prp;
    document.getElementById("mlc").textContent = data.rates.mlc;

    //-----------------------------------
    // PRODUCTOS
    //-----------------------------------

    const list = document.getElementById("product-list");

    list.innerHTML = "";

    data.products.forEach(product=>{

        list.innerHTML += `
            <div class="product-row">

                <div class="product-info">

                    <div>

                        <h3>${product.name}</h3>

                        <span class="product-size">
                            ${product.size}
                        </span>

                    </div>

                </div>

                <span class="product-price">
                    $${product.price}
                </span>

            </div>
        `;

    });

}

loadData();