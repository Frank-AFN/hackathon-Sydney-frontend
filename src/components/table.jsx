import React, { Component } from 'react';
const EOS = require('eosjs');

const config = {
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true,
  chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f', // 32 byte (64 char) hex string
  keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3', // WIF string or array of keys..
  httpEndpoint: 'http://localhost:8888',
};

const eos = EOS({ ...config });


export default class Table extends Component{

  constructor(props){
    super(props);
    this.state = {
      buyDic : {},
      price:5,
      account: 'inita1111111',
      areaStatus : [],
      rentStatus : [],

    };
  }

  componentDidMount(){
    this.getAreaStat();
    this.getRentStat();
  }

  changeThisOne = (index) => {
    let buyDic = this.state.buyDic;
    buyDic[index] = !buyDic[index];
    this.setState({
      buyDic
    })
  }

  getStyle = (index) => {
    const backgroundColor = this.state.buyDic[index]?'green':"#ccc";
    return {  width:"30px",
      height:"30px",
      textAlign:"center",
      verticalAlign:"middle",
      backgroundColor,
      border:"1px solid #fff",
    }
  }

  getArr = () => {
    let arr = [];
    for(let key in this.state.buyDic){
      if(this.state.buyDic[key]){
        arr.push(key);
      }
    }
    return arr;
  }


//   cleos push action globalsquare payplant '{
//   "area": 0,
//   "payer": "inita1111111",
//   "renter": "initb1111111"
// }' -p initb1111111
  plant = () => {
    let treeArr = this.getArr();
    eos.transaction({
      actions: [
        {
          account: 'globalsquare',
          name: 'payplant',
          authorization: [{
            actor: this.state.account,
            permission: 'active',
          }],
          data: {
             area: treeArr[0],
             payer: this.state.account,
             renter: this.state.account
            },
        },
      ],
    }).then(()=>{

    }).catch((err)=>{
      console.log(err)
    })
  }

//   cleos push action globalsquare rentareas '{
//   "renter": "initb1111111",
//   "areas":[0],
// }' -p initb1111111
  rent = () => {
    let treeArr = this.getArr();
    eos.transaction({
      actions: [
        {
          account: 'globalsquare',
          name: 'rentareas',
          authorization: [{
            actor: this.state.account,
            permission: 'active',
          }],
          data: {
            areas: treeArr,
            renter: this.state.account
          },
        },
      ],
    }).then(()=>{

      this.getAreaStat();
      this.getRentStat();
    }).catch((err)=>{
      console.log(err)
    })
  }



//   cleos push action globalsquare buyarea '{
//   "buyer": "inita1111111",
//   "price_per_square": 5
// }' -p inita1111111
  buyArea = () => {
    eos.transaction({
      actions: [
        {
          account: 'globalsquare',
          name: 'buyarea',
          authorization: [{
            actor: this.state.account,
            permission: 'active',
          }],
          data: {
            buyer: this.state.account,
            price_per_square: this.state.price
          },
        },
      ],
    }).then(()=>{
this.getAreaStat();
this.getRentStat();
    }).catch((err)=>{
      console.log(err)
    })
  }


//   cleos push action globalsquare paywater '{
//   "area": 0,
//   "payer": "inita1111111",
//   "renter": "initb1111111"
// }' -p initb1111111
  water = () => {
    let treeArr = this.getArr();
    eos.transaction({
      actions: [
        {
          account: 'globalsquare',
          name: 'paywater',
          authorization: [{
            actor: this.state.account,
            permission: 'active',
          }],
          data: {
            area: treeArr[0],
            payer: this.state.account,
            renter: this.state.account
          },
        },
      ],
    }).then(()=>{

    }).catch((err)=>{
      console.log(err)
    })
  }


  getAreaStat = () => {
    eos.getTableRows({
                       json: true,
                       code: 'globalsquare',
                       scope: 'globalsquare',
                       table: 'areastat',
                       table_key: 'active',
                       limit: 300,
                     }).then((result) => {

                       this.setState({
                         areaStatus : result.rows
                       })
      }).catch((err) => {
        console.log('GET TABLE AREA ERROR==========================');
        console.log(err);
      });

  }

//   "rows": [{
//     "area_id": 0,
//     "owner": "inita1111111",
//     "price_per_square": 5,
//     "rented": 1
//   },{
//     "area_id": 1,
//     "owner": "inita1111111",
//     "price_per_square": 6,
//     "rented": 0
//   }
//     ],
//   "more": false
// }
// {
//   "rows": [{
//   "renter": "initb1111111",
//   "areas": [
//     0
//   ]
// }
// ],


  getRentStat = () => {
    eos.getTableRows({
                       json: true,
                       code: 'globalsquare',
                       scope: 'globalsquare',
                       table: 'renterstat',
                       table_key: 'active',
                       limit: 300,
                     }).then((result) => {

      this.setState({
        rentStatus : result.rows
      })
      }).catch((err) => {
        console.log('GET TABLE RENT STAT==========================');
        console.log(err);
      });

  }



  render(){

    const row = [0,1,2,3,4,5,6,7,8,9,10,11];
    const column = row;
    let count = 0;
    for(let key in this.state.buyDic){
      if(this.state.buyDic[key]){
        count ++;
      }
    }

   const button = {
      backgroundColor: "#4CAF50",
      border: "none",
      color: "white",
      padding: "5px 12px",
      textAlign: "center",
      textDecoration: "none",
      display: "inline-block",
      fontSize: "16px",
     margin:"5px 10px",
    }


    return <div style={{margin:'auto', textAlign:'center'}}>
      <button onClick={this.buyArea} style={button}>Buy Area</button>
      <button onClick={this.rent} style={button}>Rent Area</button>
      <button onClick={this.water} style={button}>Water</button>
      <button onClick={this.plant} style={button}>Plant</button>

      Total: { count * 5}

      <div >
        <table style={{margin:'auto'}}>
          <tbody>
          {
            row.map((i,index)=>{
              return <tr key = {index}>
                {
                  column.map((j,index)=>{
                    return <td style={this.getStyle(12*i+j)}
                               key={12*i + j}
                               onClick={() => this.changeThisOne(12*i+j)}>

                    </td>
                  })
                }
              </tr>
            })
          }
          </tbody>
        </table>
      </div>

      <div>
        <div style={{display: 'inline-block'}}>
          <h3>Area Status</h3>
          <table style={{borderCollapse:"collapse"}}>
            <thead>
              <tr style={{borderBottom:'2px solid black'}}>
                <td>&nbsp;&nbsp;Area Id&nbsp;&nbsp;</td>
                <td>&nbsp;&nbsp;  Owner &nbsp;&nbsp; </td>
                <td>&nbsp;&nbsp;Price&nbsp;&nbsp;</td>
                <td>&nbsp;&nbsp;rented&nbsp;&nbsp;</td>
              </tr>
            </thead>
            <tbody>
            {
              this.state.areaStatus.map((res) => {
                return <tr style={{borderBottom:'1px solid black'}}>
                  <td style={{borderBottom:'1px solid black'}}>{res.area_id}</td>
                  <td style={{borderBottom:'1px solid black'}}>{res.owner}</td>
                  <td style={{borderBottom:'1px solid black'}}>{res.price_per_square}</td>
                  <td style={{borderBottom:'1px solid black'}}>{res.rented?'true':'false'}</td>
                </tr>
              })
            }

            </tbody>
          </table>
          {/*{*/}
            {/*this.state.areaStatus.map((res)=>{*/}
              {/*return <p>{res.owner} {res.area_id}</p>*/}
              {/*"area_id": 0,*/}
                {/*"owner": "inita1111111",*/}
                {/*"price_per_square": 5,*/}
                {/*"rented": 1*/}
            {/*})*/}
          {/*}*/}
        </div>



        <div style={{display: 'inline-block', marginLeft:'20px'}}>
          <h3>Rent Status</h3>


          <table style={{borderCollapse:"collapse"}}>
            <thead>
            <tr  style={{borderBottom:'2px solid black'}}>
              <td>Owner</td>
              <td>Area</td>
            </tr>
            </thead>
            <tbody>
            {
              this.state.rentStatus.map((res) => {
                return <tr style={{borderBottom:'1px solid black'}}>
                  <td>{res.renter}</td>
                  <td>{res.areas.join(',')}</td>
                </tr>
              })
            }

            </tbody>
          </table>
        </div>
      </div>


    </div>
  }
}





