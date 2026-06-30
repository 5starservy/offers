let lastDataString = "";

async function loadData() {
    try {
        const response = await fetch("data.json?v=" + Date.now(), {
            cache: "no-store"
        });
        const data = await response.json();

        const currentDataString = JSON.stringify(data);

        if (currentDataString !== lastDataString) {
            lastDataString = currentDataString;

            const ahora = new Date();
            const horaTexto = ahora.toLocaleTimeString('es', {
                hour: '2-digit',
                minute: '2-digit'
            });
            document.getElementById("last-updated").textContent = horaTexto;
        }

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
        data.products.forEach(product => {
            list.innerHTML += `
                <div class="product-row">
                    <div class="product-info">
                        <div>
                            <h3>${product.name}</h3>
                            <span class="product-size">${product.size}</span>
                        </div>
                    </div>
                    <span class="product-price">$${product.price}</span>
                </div>
            `;
        });
    } catch (err) {
        console.error("No se pudieron cargar los datos:", err);
    }
}

loadData();

// Refresca solo cada 90 segundos, sin que el usuario haga nada
setInterval(loadData, 90 * 1000);