import React, { useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Bank from '../Bank';

import { Box, Grid, LinearProgress, Button } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/styles';

import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';

//import useBanks from '../../hooks/useBanks';
import useTombFinance from '../../hooks/useTombFinance';

import PitImage from '../../assets/img/background.png';

import Nav from '../../components/Nav/Nav';

// Import custom css
import "./style.css";
import { BorderLeft } from '@material-ui/icons';

// Import the Web3.js library
const Web3 = require('web3');

// Create a new Web3 instance connected to the Polygon network
const web3 = new Web3('https://polygon.rpc.blxrbdn.com'); // Replace with the desired Polygon RPC endpoint

// Define the smart contract address and ABI
const contractAddress = '0xA31dF16b7eF7D94862110F75fa69bae559c0FCA5';
const contractAbi = [ {"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"string","name":"_initBaseURI","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address[100]","name":"_users","type":"address[100]"}],"name":"add100PresaleUsers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"addPresaleUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseExtension","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMintAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"presaleWallets","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"removePresaleUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"removeWhitelistUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newBaseExtension","type":"string"}],"name":"setBaseExtension","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newBaseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newCost","type":"uint256"}],"name":"setCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newCost","type":"uint256"}],"name":"setPresaleCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newmaxMintAmount","type":"uint256"}],"name":"setmaxMintAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"walletOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"whitelistUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}] ;

// Create a new instance of the smart contract
const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Call the `totalSupply` function on the smart contract
contract.methods.totalSupply().call((error, result) => {
  if (error) {
    console.error(error);
  } else {
        const resultsupply = result;
            document.getElementById('resultsupply').innerHTML = `${resultsupply}`;
    console.log(`Total supply: ${result}`);
  }
});

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${PitImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  stakeButtons: {
    marginRight: '1rem',
  }
}));

const Llama = () => {
//  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { account, /*ethereum*/ } = useWallet();
//  const activeBanks = banks.filter((bank) => !bank.finished);
  const classes = useStyles();
  const tombFinance = useTombFinance();
  const [nftsInWallet, setNftsInWallet] = useState([]);
  const [nftsStaked, setNftsStaked] = useState([]);
  const [nftTotalSupply, setNftTotalSupply] = useState(1);
  const [nftStakedTotalSupply, setNftStakedTotalSupply] = useState(0);
  const [indexOfSelectedNft, setIndexOfselectedNft] = useState(-1);
  const [indexOfSelectedNftInWallet, setIndexOfselectedNftInWallet] = useState(-1);
  const [reward, setReward] = useState(0);
// Minting process
const [mintAmount, setMintAmount] = useState(3);

  const reloadNfts = async () => {
    if (account) {
      let nftsInWalletWithJSON = await tombFinance.getNFTsInWallet(account, 'ChibidogsNFT');
      setNftsInWallet(await Promise.all(
        nftsInWalletWithJSON.map(async nft => {
          return {
            tokenId: nft.tokenId,
            ...await getImageFromJSON(nft.metaDataJson)
          }
        })
      ));

      let nftsStakedWithJSON = await tombFinance.getNFTsStaked(account, 'ChibidogsNFT', 'LlamaStakingNFT');
      setNftsStaked(await Promise.all(
        nftsStakedWithJSON.map(async nft => {
          return {
            tokenId: nft.tokenId,
            ...await getImageFromJSON(nft.metaDataJson)
          }
        })
      ));

      setNftTotalSupply(await tombFinance.nftTotalSupply('ChibidogsNFT'));
      setNftStakedTotalSupply(await tombFinance.nftStakedTotalSupply('ChibidogsNFT', 'LlamaStakingNFT'));
    }
  }

  useEffect(() => {
    reloadNfts();
  }, [tombFinance, account]);

  
  const getImageFromJSON = async (json) => {
    try {
      const { image, name} = await (await fetch('https://artion3.mypinata.cloud/ipfs/' + json.replace('ipfs://', ''))).json();
      return {
        image: 'https://artion3.mypinata.cloud/ipfs/' + image.replace('ipfs://', ''),
        name,
      };
    } catch(e) {
      return await getImageFromJSON(json);
    }
  }

  const selectNftStaked = async (index) => {
    setIndexOfselectedNft(index);
    setIndexOfselectedNftInWallet(-1);
    setReward(await tombFinance.calculateRewards(account, [nftsStaked[index].tokenId], 'LlamaStakingNFT'));
  }

  const selectNftInWallet = async (index) => {
    setIndexOfselectedNftInWallet(index);
    setIndexOfselectedNft(-1);
  }

  const stake = async () => {
    await tombFinance.stakeNfts([nftsInWallet[indexOfSelectedNftInWallet].tokenId], 'LlamaStakingNFT');
    reloadNfts();
  }

    const stakeAll = async () => {
    let nftsInWalletWithJSON = await tombFinance.getNFTsInWallet(account, 'ChibidogsNFT');
      for (const nft of nftsInWalletWithJSON){
        await tombFinance.stakeNfts([nft.tokenId], 'LlamaStakingNFT');
      }
    console.log(nftsInWalletWithJSON)
    reloadNfts();
  }

  const unStake = async () => {
    await tombFinance.unStake(nftsStaked[indexOfSelectedNft].tokenId, 'LlamaStakingNFT');
    reloadNfts();
  }

  const claim = async () => {
    await tombFinance.claim(nftsStaked[indexOfSelectedNft].tokenId, 'LlamaStakingNFT');
    setReward(await tombFinance.calculateRewards(account, [nftsStaked[indexOfSelectedNft].tokenId], 'LlamaStakingNFT'));
  }

  const approve = async () => {
    await tombFinance.approve('ChibidogsNFT', 'LlamaStakingNFT');
  }

  const mint = async (amount) => {
    console.log(account);
    await tombFinance.mintchibidogsNFT(account, amount);


}

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 50) {
      newMintAmount = 50;
    }
    setMintAmount(newMintAmount);
  };

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <BackgroundImage />
          <Nav></Nav>
          <div style={{ textAlign: 'center', color: 'white' }}>
          <h2 style={{ textAlign:'center', marginBottom: '5px'  }}>Chibi Dogs</h2>
          <Grid container justify="center" spacing={0} style={{marginTop: '10px', marginBottom: '10px'}}>
                                      
            <span>
             <span style={{fontSize: '20px'}}>Total Minted
             </span>
               <br></br><span id="resultsupply"></span>/1000
             </span>
                 </Grid>
                     <Grid container justify="center" spacing={0} style={{marginTop: '10px', marginBottom: '10px'}}>
                     <img style={{width: '200px', height:'200px', border: '1px black solid'}} src={require('./example.webp')} />
          <Grid container justify="center" spacing={0} style={{marginTop: '10px', marginBottom: '10px'}}>

                      <h4 style={{ textAlign:'center', marginBottom: '2px'  }}>FREE MINT</h4>
                  </Grid>
                 </Grid>
              <span>
                      <circleButton
                        style={{ lineHeight: 0.4 }}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementMintAmount();
                        }}
                      >
                        -
                      </circleButton>
                  
                        &nbsp;{mintAmount}&nbsp; 
           
                      <circleButtonleft
                        onClick={(e) => {
                          e.preventDefault();
                          incrementMintAmount();
                        }}
                      >
                        +
                      </circleButtonleft>
                      <br></br>

                      <mintButton style={{marginTop: '10px', marginBottom: '10px' }}
    
                        onClick={(e) => {
                          console.log("mintamount", {mintAmount})
                       
                          mint(Object.values({mintAmount}))
                    

                        }}
                      >
                        Mint
                      </mintButton>

                    <br></br>
                    </span>

          
            <span style={{ fontSize: '36px' }}>
              { parseInt(nftStakedTotalSupply * 100 / nftTotalSupply) } % Dogs STAKED
            </span>
            <BorderLinearProgress variant="determinate" value={nftStakedTotalSupply * 100 / nftTotalSupply} />
            <br/>
            <Grid container spacing={2}>
              <Grid xs={6} item>
                <Box style={{
                  background: 'gray',
                  minHeight: '500px',
                  padding: '1rem',
                  borderRadius: '4px',
                  borderTop: '6px black solid',
                  borderBottom: '6px black solid',
                  borderRight: '6px black solid',
                  borderLeft: '6px black solid',
                  boxShadow: 'inset -4px -4px 0px 0px #292929',
                }}>
                  <p>
                    {nftsInWallet.length} NFT(s) in your wallet
                  </p>
                  <Box style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}>
                    {
                      nftsInWallet.map(({image, name}, index) => 
                        <Box style={{
                          marginRight: '1rem',
                        }}>
                          <img
                            src={image} 
                            style={{
                              border: index === indexOfSelectedNftInWallet ? '2px solid blue' : '',
                              width: '150px',
                              height: '150px',
                            }}
                            onClick={() => selectNftInWallet(index)}
                            alt="NFT"
                          />
                          <p> { name } </p>
                        </Box>
                      )
                    }
                  </Box>
                </Box>
              </Grid>
              <Grid xs={6} item>
                <Box style={{
                  background: 'gray',
                  padding: '1rem',
                  borderRadius: '4px',
                  visibility: indexOfSelectedNft === -1 && indexOfSelectedNftInWallet === -1 ? 'hidden' : 'visible',
                  height: '100px',
                  borderTop: '6px black solid',
                  borderBottom: '6px black solid',
                  borderRight: '6px black solid',
                  borderLeft: '6px black solid',
                  display: 'inline-block',
                  boxShadow: 'inset -4px -4px 0px 0px #292929',
                  boxSizing: 'content-box',
                  position: 'relative',
                }}>
                  {
                    indexOfSelectedNft > -1 && <>
                      <p style={{fontSize: '18px', fontWeight: 'bold'}}>
                        { nftsStaked[indexOfSelectedNft].name }
                      </p>
                      <Box style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <div>
                          <Button
                            variant='contained' 
                            color="primary" 
                            classes={{
                              root: classes.stakeButtons,
                            }}
                            onClick={unStake}
                          >
                            Unstake
                          </Button>
                          <Button
                            variant='contained'
                            color="primary"
                            onClick={claim}
                          >
                            Claim
                          </Button>
                        </div>
                        <p style={{maxWidth: '50%'}}>Claimable: { reward / 1e18 } Cat Coins</p>
                      </Box>
                    </>
                  }
                  {
                    indexOfSelectedNftInWallet > -1 && <>
                     <p style={{fontSize: '18px', fontWeight: 'bold'}}>
                        { nftsInWallet[indexOfSelectedNftInWallet].name }
                      </p>
                      <Box style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                        
                      }}>
                        <div>
                          <br></br>
             STAKING COMING SOON - BE READY
                        </div>
                      </Box>
                    </>
                  }
                </Box>
                <Box style={{
                  background: 'gray',
                  minHeight: '300px',
                  padding: '1rem',
                  borderRadius: '4px',
                  marginTop: '2rem',
                  borderTop: '6px black solid',
                  borderBottom: '6px black solid',
                  borderRight: '6px black solid',
                  borderLeft: '6px black solid',
                  boxShadow: 'inset -4px -4px 0px 0px #292929',
                  boxSizing: 'content-box',
                  position: 'relative',
                }}>
                  <p>
                    { nftsStaked.length } NFT(s) staked
                  </p>
                  <Box style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}>
                    {
                      nftsStaked.map(({image, name}, index) => 
                        <Box style={{
                          marginRight: '1rem',
                        }}>
                          <img 
                            src={image}
                            width="150"
                            style={{
                              border: index === indexOfSelectedNft ? '2px solid blue' : '',
                              width: '150px',
                              height: '150px',
                            }}
                            onClick={() => selectNftStaked(index)}
                            alt="NFT"
                          />
                          <p> { name } </p>
                        </Box>
                      )
                    }
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </div>

          {/* {!!account ? (
            <Container maxWidth="lg">
              <h2 style={{ textAlign: 'center', fontSize: '80px' }}>NFT Staking</h2>

              <Box mt={5}>
                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 2).length === 0}>
                  <Typography color="textPrimary" variant="h4" gutterBottom>
                    MvSHARE Rewards Pools
                  </Typography>

                  <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 2)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <CemeteryCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>

                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 0).length === 0}>
                  <Typography color="textPrimary" variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    Genesis Pools
                  </Typography>
                  <Alert variant="filled" severity="warning">
                    Genesis Pools start soon.
                  </Alert>
                  <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 0)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <CemeteryCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>
              </Box>
            </Container>
          ) : (
            <UnlockWallet />
          )} */}
        </Route>
        <Route path={`${path}/:bankId`}>
          <BackgroundImage />
          <Bank />
        </Route>
      </Page>
    </Switch>
  );
};

export default Llama;
