const domain = document.getElementById("domain")
const url = document.getElementById("url")
const addBtn = document.getElementById("add")
const table = document.getElementById( "myTable" )
const openAllBtn = document.getElementById( "openAll" )

let cellDomain, cellURL, cellAction, btnDelete, btnOpenUrl

const isOccupied = () => domain.value != '' && url.value != ''

const addRow = ( domain, url ) => {

    //Creating and adding row and cells in the table
    const row = table.insertRow( table.rows.length )

    btnDelete = document.createElement( 'button' )
    btnDelete.innerHTML = 'Delete'
    btnDelete.className = 'btnDelete'

    btnOpenUrl = document.createElement( 'button' )
    btnOpenUrl.innerHTML = 'Open'
    btnOpenUrl.className = 'btnOpen'

    cellDomain = row.insertCell(0);
    cellURL = row.insertCell(1);
    cellAction = row.insertCell(2);

    cellDomain.innerHTML = domain;
    cellURL.innerHTML = url;

    cellAction.appendChild( btnOpenUrl )
    cellAction.appendChild( btnDelete )


    btnDelete.addEventListener( 'click', () => { 

        list = list.filter( ({url}) => url != row.cells[1].innerHTML )

        localStorage.setItem('table', JSON.stringify( list ))

        row.remove() 

    } )

    btnOpenUrl.addEventListener( 'click', () => open( row.cells[1].innerHTML ) )

}

const callback = event => {


    event.preventDefault()

    if( isOccupied() )
    {
        
        addRow( domain.value, url.value )

        list = JSON.parse(localStorage.getItem( 'table' ))

        list.push( {domain:domain.value, url:url.value} )

        localStorage.setItem('table', JSON.stringify( list ))

        console.log( list )

        domain.value = ''
        url.value = ''

    }

}

if( !localStorage.getItem( 'table' ) )
localStorage.setItem( 'table', JSON.stringify([]) )

let list = JSON.parse(localStorage.getItem( 'table' ))

console.log( list )

list.forEach( ({domain, url}) => addRow( domain,url ))

addBtn.addEventListener( 'click', callback )

openAllBtn.addEventListener( 'click', () => {

    list.forEach( ({url}) => open(url) )

} )


