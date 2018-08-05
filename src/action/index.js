/**
 * Created by zhangyy on 2/24/17.
 */

let chainId = "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f"
let nodeAddress = "http://localhost:8888"

export function GetEOS( accountPrivateKey ) {
  try {
    const Eos = require( 'eosjs' );
    const config = {
      keyProvider: accountPrivateKey, // WIF string or array of keys..
      httpEndpoint: nodeAddress,
      expireInSeconds: 60,
      broadcast: true,
      debug: false,
      sign: true,
      chainId: chainId,
    };
    let eos = Eos.Testnet( config );
    return eos;
  } catch ( error ) {
    return null;
  }
}


export function EOSGetInfo( eos, callback ) {
  console.log( '============== EOSGetInfo ==================' );
  try {
    eos.getInfo( {} )
      .then( function ( result ) {
        console.log( 'EOSGetInfo result: ' + JSON.stringify( result ) );

        callback && callback( null, result );
      } )
      .catch( function ( error ) {
        console.log( 'EOSGetInfo error: ' + error.message );

        callback && callback( error, null )
      } );
  } catch ( ignored ) {
  }
}

export function EOSAreaStattable( eos, callback ) {
  console.log( '============== EOSAreaTable ==================' );

  eos.getTableRows( {
    'json': true,
    'code': 'globalsquare',
    'scope': 'globalsquare',
    'table': 'areastat',
    'table_key': 'owner'
  } )
    .then( function ( result ) {
      console.log( 'Area status result: ' + JSON.stringify( result ) );

      callback && callback( null, result );
    } )
    .catch( function ( error ) {
      console.log( 'EOSRefunding error: ' + error.message );

      callback && callback( error, null );
    } );
}

export function EOSRentertable( eos, callback ) {
  console.log( '============== EOSRenterTable ==================' );

  eos.getTableRows( {
    'json': true,
    'code': 'globalsquare',
    'scope': 'globalsquare',
    'table': 'renterstat',
    'table_key': 'owner'
  } )
    .then( function ( result ) {
      console.log( 'Renter status result: ' + JSON.stringify( result ) );

      callback && callback( null, result );
    } )
    .catch( function ( error ) {
      console.log( 'EOSRefunding error: ' + error.message );

      callback && callback( error, null );
    } );
}

export function EOSbuyarea( eos, accountName, callback ) {
  console.log('============== EOSBuyram ==================');
  eos.transaction(tr => {
    tr.buyarea({
      "buyer": accountName,
      "price_per_square": 5
    });
  })
    .then(function (result) {
      console.log('buyarea result: ' + JSON.stringify(result));

      callback && callback(null, result);
    })
    .catch(function (error) {
      console.log('buyarea error: ' + error.message);

      callback && callback(error, null);
    });
}



export const fetchData = ()=> (dispatch, getState) =>{
  setTimeout(
    function () {
      let accountPrivateKey = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";
      let eos = GetEOS(accountPrivateKey);
      EOSGetInfo(eos);
      EOSAreaStattable(eos);
      EOSRentertable(eos);
      EOSbuyarea(eos, "initb1111111");
    }, 0)
};