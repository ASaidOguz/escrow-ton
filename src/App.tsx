import './App.css';
import { TonConnectButton } from '@tonconnect/ui-react';
import Form from './components/Form';
import { useState } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useTonConnect } from './hooks/useTonConnect';
import { useEscrowContract } from './hooks/useEscrowContract';


function App() {
  const[arbiter,setArbiter]=useState<String>("");
  const[beneficiary,setBeneficiary]=useState<String>("");
  const[value,setValue]=useState<String>("");
  
  const { connected } = useTonConnect();
  const {  address, sendDeploy } = useEscrowContract();
   console.log("Arbiter:",arbiter)
   console.log("Benefciary:",beneficiary)
   console.log("Value:",value)

  return (
    <div>
      <TonConnectButton />
      <Form
        arbiter={''} 
        beneficiary={''} 
        value={''} 
        setArbiter={setArbiter}
        setBeneficiary={setBeneficiary}
        setValue={setValue}
        />
           <div>Contract Address:{address}</div>
          <div>Arbiter:{arbiter}</div>
          <div>Beneficiary:{beneficiary}</div>
          <div>Value:{value}</div>
          <Button id="deployButton" colorScheme='blue' onClick={sendDeploy}>Deploy</Button>
    </div>
    
  );
}

export default App
