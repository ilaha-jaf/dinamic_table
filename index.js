const root = document.getElementById('root');

const url='https://randomuser.me/api/?results=5';
async function fetchData() {
    try {
        const result = await fetch(url);
        const data = await result.json();
        const users = data.results.map(user => ({
            name: user.name.first,
            lastName: user.name.last,
            phone: user.phone,
            email: user.email,
            birthDate: user.dob.date
        }));

        const table = createTable(users);
        root.appendChild(table);
    }
    catch (e) {
        console.log(e);
        console.log('Rejected with error');
    }
    finally {
        console.log('Finally');
    }
}

fetchData();

function createTable(data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    table.className = 'table table-striped table-bordered table-hover table-info';
    const headers = Object.keys(data[0]);
    const tr = document.createElement('tr');

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tr.appendChild(th);
    });
    thead.appendChild(tr);

    data.forEach(item => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = item[header];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}