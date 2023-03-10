import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, OpenedContract,toNano,Cell } from 'ton-core';
import { EscrowTon, EscrowTonConfig} from '../wrappers/EscrowTon';
import { Buffer } from 'buffer';
import { StateInit } from 'ton';
import { compile, NetworkProvider } from '@ton-community/blueprint';


export function useEscrowContract() {
    const client = useTonClient();
     
    const { sender } = useTonConnect();
    const ARBITER_ADDRESS=Address.parse("EQDjUc7m2zSZ_oWh4wvmLf5a3UqOUfSzvBODeY5RXy9EWy7p")
    const BENEFICIARY_ADDRESS=Address.parse("EQB0glMVNLbDPto1xNJoAVxaK1cL7oTLNPvbdhXyk2htw59L")
    const DEPLOYER_ADDRESS=Address.parse("EQDjUc7m2zSZ_oWh4wvmLf5a3UqOUfSzvBODeY5RXy9EWy7p")

  const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

  const escrowContract = useAsyncInitialize(async () => {
    if (!client) return;
const boc={"hex":"b5ee9c724102100100013c000114ff00f4a413f4bcf2c80b01020162090202012006030201200504000dbb778f001f8428000db9ef3f001f84380201480807000db734be003f0890000db7fcbe003f08300202cd0b0a008dd7800b8104008646582a801e78b10fd010965b5658fc684e90cad8d8de5882e4c4d2e8cae440c6c2dcc6cad8cac840e8d0ca40e8e4c2dce6c2c6e8d2dedc430678b64c1837d8040201200d0c00915f00170208010c8cb055003cf1621fa0212cb6acb1f8d0a52195b1b1bcb18995b99599a58da585c9e48165bdd5c881c185e5b595b9d0818dbdb999a5c9b59590860cf16c98306fb0080201200f0e002f3b513434c7c07e187e90007e18be90007e18fe900c3e1920006f0831c02456f8007434c0cc1c6c244c3834c7cc0820843a3055a06ea5cc3c007e10fc00f820843303c949aea5bc007e113c01382103fcbc205cbffb91"}
   
    const EscrowCodeCell=Cell.fromBoc(Buffer.from(boc.hex,"hex"))[0]
    console.log("Escrow Cell",EscrowCodeCell)
    const contract = EscrowTon.createFromConfig({
        query_id:Math.floor(Math.random() * 10000),
        arbiter:ARBITER_ADDRESS,
        beneficiary:BENEFICIARY_ADDRESS,
        owner:DEPLOYER_ADDRESS
      },EscrowCodeCell);
    
    return client.open(contract) as OpenedContract<EscrowTon>;
  }, [client]);

  console.log("Escrow:",escrowContract)
  
  
  return {
    
    address: escrowContract?.address.toString(),
    sendDeploy: async() => {
      return await escrowContract?.sendDeploy(sender,toNano("0.05"));
    },
  };









}