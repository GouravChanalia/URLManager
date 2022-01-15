const toasterContainer = document.getElementById("toaster-container");
const domain = document.getElementById("domain")
const url = document.getElementById("url")
const addBtn = document.getElementById("add")
const table = document.getElementById( "myTable" )
const openAllBtn = document.getElementById( "openAll" )

let cellDomain, cellURL, cellAction, btnDelete, btnCopyURL, btnOpenUrl, urlDiv, urlCopyBtn ;

const isOccupied = () => domain.value != '' && url.value != ''

const addRow = ( domain, url, flag = 0) => {

    /* Creating and adding row and cells in the table */
    const row = table.insertRow( table.rows.length )

    /* Create button Delete */
    btnDelete = document.createElement( 'button' )
    btnDelete.innerHTML = 'Delete'
    btnDelete.className = 'btnDelete'

    /* Create button Open */
    btnOpenUrl = document.createElement( 'button' )
    btnOpenUrl.innerHTML = 'Open'
    btnOpenUrl.className = 'btnOpen'

    cellDomain = row.insertCell(0);
    cellURL = row.insertCell(1);
    cellAction = row.insertCell(2);

    cellDomain.innerHTML = domain;
    cellDomain.style.fontSize = "1.1em"
    
    /* preparing div and child elements to be appended inside cellUrl */
    urlDiv = document.createElement( 'div' );
    urlDiv.innerHTML = url;
    urlCopyBtn = document.createElement( 'span' );
    urlCopyBtn.className = "material-icons btnCopyUrl";
    urlCopyBtn.innerHTML = "&nbsp;&nbsp;content_paste";
    urlDiv.appendChild( urlCopyBtn );

    /* append buttons to table row */
    cellAction.appendChild( btnOpenUrl );
    cellURL.appendChild( urlDiv );
    !flag ? cellAction.appendChild( btnDelete ) : "";

    /* event Listeners */
    urlCopyBtn.addEventListener( 'click', () => {

        /* copy url to clipboard */
        navigator.clipboard.writeText( url );
        
        /* show toaster */
        const toaster = document.createElement( 'div' );
        toaster.className = "toaster";
        toaster.innerHTML = "Copied!";
        toasterContainer.appendChild(toaster);
        setTimeout( () => {
            toaster.remove();
        }, 3000 )

    } )

    btnDelete.addEventListener( 'click', () => { 

        list = list.filter( ({url}) => url != row.cells[1].innerHTML )

        localStorage.setItem('table', JSON.stringify( list ))

        row.remove() 

    } )

    btnOpenUrl.addEventListener( 'click', () => {
        open( row.cells[1].innerHTML );
    } )

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

if( !localStorage.getItem( 'table' ) ){


    const value = []

    value.push( {domain:"URL Manager", url:"https://github.com/GouravChanalia/URLManager"} )

    localStorage.setItem( 'table', JSON.stringify( value ))
    
}

let list = JSON.parse( localStorage.getItem( 'table' ) )

list.forEach( ({domain, url}) => new RegExp('URL Manager','i').test(domain) && url === 'https://github.com/GouravChanalia/URLManager' ?addRow( domain,url,1 ):addRow( domain,url))

addBtn.addEventListener( 'click', callback )

openAllBtn.addEventListener( 'click', () => {

    list.forEach( ({url}) => open(url) )

} )


