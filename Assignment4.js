async function getData() {
    const url = 'https://covid-193.p.rapidapi.com/statistics';
    const options = {
        method: 'GET',
        //Tempat header
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        let resultFind;
        let searchString = String(document.getElementById("searchBar").value);
        if(!searchString){
            alert("Search bar kosong");
            return;
        }

        for (let index1 = 0; index1 < result.response.length; index1++) {
            if (result.response[index1].country === searchString) {
                resultFind = result.response[index1];
                console.log(result.response[index1]);
            }
        }

        if(!resultFind){
            alert("Data tidak ditemukan");
            return;
        }

        let activeCases = resultFind.cases.active;
        let newCases = resultFind.cases.new;
        let recoveredCases = resultFind.cases.recovered;
        let totalCases =  resultFind.cases.total;
        let totalDeaths = resultFind.deaths.total;
        let totalTest = resultFind.tests.total;

        if(activeCases === null){
            activeCases = 0;
        }
        if(newCases === null){
            newCases = 0;
        }
        if(recoveredCases === null){
            recoveredCases = 0;
        }
        if(totalCases === null){
            totalCases = 0;
        }
        if(totalDeaths === null){
            totalDeaths = 0;
        }
        if(totalTest === null){
            totalTest = 0;
        }

        let list = '';

        list = `
        <div class="d-flex flex-wrap flex-row justify-content-around mt-3 gap-3">
            <div class="d-flex flex-wrap">
                <div class="card bg-danger bg-gradient">
                <img src="./virus.jpg" class="card-img-top" alt="..." width="150" height="150">
                    <div class="card-body">
                        <h6 class="card-title">Active Cases</h6>
                        <p class="card-text">${activeCases}</p>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-wrap">
                <div class="card bg-danger bg-gradient">
                <img src="./cough.jpg" class="card-img-top" alt="..." width="150" height="150">
                    <div class="card-body">
                        <h6 class="card-title">New Cases</h6>
                        <p class="card-text">${newCases}</p>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-wrap">
                <div class="card bg-danger bg-gradient">
                <img src="./health.jpg" class="card-img-top" alt="..." width="150" height="150">

                    <div class="card-body">
                        <h6 class="card-title">Recovered Cases</h6>
                        <p class="card-text">${recoveredCases}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex flex-wrap flex-row justify-content-around mt-3 gap-3">
            <div class="d-flex flex-wrap">
                <div class="card bg-danger bg-gradient">
                <img src="./case.jpg" class="card-img-top" alt="..." width="150" height="150">

                    <div class="card-body">
                        <h6 class="card-title">Total Cases</h6>
                        <p class="card-text">${totalCases}</p>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-wrap">
                <div class="card bg-danger bg-gradient">
                    <img src="./death.jpg" class="card-img-top" alt="..." width="150" height="150">
                    <div class="card-body">
                        <h6 class="card-title">Total Deaths</h6>
                        <p class="card-text">${totalDeaths}</p>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-wrap">
                <div class="card bg-danger bg-gradient">
                <img src="./test.jpg" class="card-img-top" alt="..."width="150" height="150">

                    <div class="card-body">
                        <h6 class="card-title">Total Test</h6>
                        <p class="card-text">${totalTest}</p>
                    </div>
                </div>
            </div>
        </div>
        `
        
        let showCardId = document.getElementById("showHasil");

        showCardId.innerHTML = list;

    } catch (error) {
        console.error(error);
    }
}