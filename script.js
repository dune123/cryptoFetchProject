let cyrptoData=[]

const fetchCryptoData=async()=>{
    try {
        const response=await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')

        try {
            const data=await response.json();

            cyrptoData=data;
            renderCoins(cyrptoData);
        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        console.log(error)
    }
}   


const renderCoins=(array)=>{
    const tableBodyContainer=document.querySelector('tbody');
    
    tableBodyContainer.innerHTML='';

    array.map((item)=>{
        const eachRow=document.createElement('tr');

        eachRow.innerHTML=`<tr>
                            <td>
                                <img src=${item.image}/>
                                <p>${item.name}</p>
                            </td>
                            <td>
                                ${item.symbol}
                            </td>
                            <td>
                                $${item.current_price}
                            </td>
                            <td>
                                $${item.market_cap_change_24h}    
                            </td>
                            <td style="color: ${item.price_change_percentage_24h>0?'green':'red'}">
                                ${item.price_change_percentage_24h}%    
                            </td>
                            <td>
                                Mkt Cap: $${item.market_cap}
                            </td>
                            </tr>`
        tableBodyContainer.appendChild(eachRow);
    })
    console.log(array);
}

//for sorting by Martket Cap
const sortByMarketCap =()=>{
    cyrptoData.sort((a,b)=>a.market_cap-b.market_cap)

    renderCoins(cyrptoData);
}

//for sorting by Percentage
const sortByPercentage=()=>{
    cyrptoData.sort((a,b)=>a.price_change_percentage_24h-b.price_change_percentage_24h)

    renderCoins(cyrptoData);
}

//for searching
const searchingInArray=()=>{
    const name=document.getElementById('nameCoin').value.toLowerCase();
    const filterData=cyrptoData.filter((item)=>{
        return (
            item.name.toLowerCase().includes(name)
        )
    })
    renderCoins(filterData);
}

document.getElementById('nameCoin').addEventListener('input',searchingInArray);
document.getElementById('sortbymarketCap').addEventListener('click',sortByMarketCap);
document.getElementById('sortbypercentage').addEventListener('click',sortByPercentage)

fetchCryptoData();