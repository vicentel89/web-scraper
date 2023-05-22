function listPages(page = 1) {
  document.querySelector('#table').style.display = 'none';
  document.querySelector('#loading').style.display = 'block';

  const accessToken = JSON.parse(localStorage.getItem('user')).access_token;

  fetch(`http://localhost:3000/web-pages?page=${page}&limit=5`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      var tableBody = document.getElementById('content');
      tableBody.innerHTML = '';

      data.items.forEach(({ name, totalLinks, id }) =>
        addRow(tableBody, name, totalLinks, id),
      );

      document.querySelector('#table').style.display = 'table';
      document.querySelector('#loading').style.display = 'none';

      const buttonContainer = document.getElementById('pagination');
      buttonContainer.innerHTML = '';
      createPagination(buttonContainer, data.meta.totalPages);
    });
}

function addRow(tableBody, name, totalLinks, id) {
  var newRow = document.createElement('tr');

  var cellName = document.createElement('td');
  cellName.textContent = name;
  cellName.style.border = '1px solid black';
  cellName.style.padding = '8px';
  cellName.style.padding = '8px';
  cellName.style.color = 'blue';
  cellName.style.textDecoration = 'underline';
  cellName.style.cursor = 'pointer';
  cellName.addEventListener('click', () => showDetails(name, id));

  var cellTotalLinks = document.createElement('td');
  cellTotalLinks.textContent = totalLinks;
  cellTotalLinks.style.border = '1px solid black';
  cellTotalLinks.style.padding = '8px';

  newRow.appendChild(cellName);
  newRow.appendChild(cellTotalLinks);

  tableBody.appendChild(newRow);
}

function createPagination(container, totalPages) {
  Array.from({ length: totalPages }).forEach((_, index) => {
    const button = document.createElement('button');
    button.textContent = index + 1;
    button.addEventListener('click', () => listPages(index + 1));
    container.appendChild(button);
  });
}

document.addEventListener('DOMContentLoaded', listPages);

function scrape() {
  document.querySelector('#scrape').innerHTML = 'loading...';

  const page = document.querySelector('#page');

  const accessToken = JSON.parse(localStorage.getItem('user')).access_token;

  fetch('http://localhost:3000/scrape', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      url: page.value,
    }),
  })
    .then((res) => res.json())
    .then(() => {
      document.querySelector('#scrape').innerHTML = 'Scrape';
      listPages();
    });
}

const registerButton = document.querySelector('#scrape');

registerButton.addEventListener('click', scrape);

const showDetails = (name, id) => {
  document.querySelector('#loading').style.display = 'block';
  document.querySelector('#main').style.display = 'none';
  document.querySelector('#title').innerHTML = name;

  const accessToken = JSON.parse(localStorage.getItem('user')).access_token;

  fetch(`http://localhost:3000/web-pages/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      document.querySelector('#details').style.display = 'block';
      document.querySelector('#loading').style.display = 'none';

      var tableBody = document.getElementById('details-content');

      tableBody.innerHTML = '';

      data.links.forEach(({ text, url }) =>
        addDetailsRow(tableBody, text, url),
      );
    });
};

function addDetailsRow(tableBody, name, url) {
  var newRow = document.createElement('tr');

  var cellName = document.createElement('td');
  cellName.textContent = name;
  cellName.style.border = '1px solid black';
  cellName.style.padding = '8px';
  cellName.style.wordBreak = 'break-word';
  cellName.style.maxWidth = '50%';

  var cellUrl = document.createElement('td');
  cellUrl.textContent = url;
  cellUrl.style.border = '1px solid black';
  cellUrl.style.padding = '8px';
  cellUrl.style.wordBreak = 'break-word';

  newRow.appendChild(cellName);
  newRow.appendChild(cellUrl);

  tableBody.appendChild(newRow);
}

function back() {
  document.querySelector('#main').style.display = 'block';
  document.querySelector('#details').style.display = 'none';
}

document.querySelector('#back').addEventListener('click', back);
