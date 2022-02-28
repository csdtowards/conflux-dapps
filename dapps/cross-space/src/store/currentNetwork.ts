import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import networkConfig from '../../network-config.json';

export interface Network {
    name: string;
    url: string;
    networkId: string;
    scan: string;
    CRC20CrossSpaceContractAddress: string;
}

interface CurrentNetworkStore {
    core?: Network;
    target_eSpace?: Network;
}

export const currentNetworkStore = create(subscribeWithSelector(() => ({
    core: undefined,
    target_eSpace: undefined
}) as CurrentNetworkStore));


(function() {
    const isProduction = location.origin.endsWith('.com');
    const currentNetwork = networkConfig[isProduction ? '1029' : '1'];
    if (!currentNetwork) return;
    currentNetworkStore.setState({
        core: { name: currentNetwork.name, url: currentNetwork.url, networkId: currentNetwork.networkId, scan: currentNetwork.scan, CRC20CrossSpaceContractAddress: currentNetwork.CRC20CrossSpaceContractAddress },
        target_eSpace: { name: currentNetwork.eSpace.name, url: currentNetwork.eSpace.url, networkId: currentNetwork.eSpace.networkId, scan: currentNetwork.eSpace.scan, CRC20CrossSpaceContractAddress: currentNetwork.eSpace.CRC20CrossSpaceContractAddress }
    });
}());

const selectors = {
    core: (state: CurrentNetworkStore) => state.core,
    target_eSpace: (state: CurrentNetworkStore) => state.target_eSpace
}

export const useCurrentNetwork = (type: 'core' | 'target_eSpace') => currentNetworkStore(selectors[type]);