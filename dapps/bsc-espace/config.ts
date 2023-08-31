import ConfluxLogo from 'common/assets/chains/Conflux.svg';
import CFXIcon from 'cross-space/src/assets/CFX.svg';
import TokenDefaultIcon from 'cross-space/src/assets/TokenDefaultIcon.png';
import Networks from 'common/conf/Networks';
import { isProduction } from 'common/conf/Networks';

const Config = {
    network: Networks.eSpace,
    serverUrl: isProduction ? 'http://54.200.214.66:8001/' : 'http://54.200.214.66:8001/',
    BridgeContractAddress: isProduction ? '0x8fa9a165ac759e8fc35efb5a23acd2494c34811d' : '0x8fa9a165ac759e8fc35efb5a23acd2494c34811d',
    color: '#15C184',
    logo: ConfluxLogo,
    tokens: [
        {
            name: 'Conflux Test Network',
            symbol: 'bmt',
            decimals: 18,
            isNative: true,
            address: '0x0000000000000000000000000000000000000001',
            icon: CFXIcon,
            PeggedToken: {
                name: 'Pegged Conflux',
                symbol: 'Peggedmt',
                address: isProduction ? '0xe863ee58473e7fb3ad4d874a377bcf1607b8a381' : '0xe863ee58473e7fb3ad4d874a377bcf1607b8a381',
                decimals: 18,
                icon: TokenDefaultIcon,
                isPeggedToken: true
            },
        },
    ],
    chains: [
        {
            network: Networks.bsc,
            BridgeContractAddress: isProduction ? '0xf63794446dbf0d92fac1a12ac85a0990e7a5a39a' : '0xf63794446dbf0d92fac1a12ac85a0990e7a5a39a',
            color: '#F3BA2F',
            logo: 'https://bin.bnbstatic.com/static/images/common/logo.png',
            tokens: [
                {
                    name: 'Local BSC Conflux',
                    symbol: 'mt',
                    address: isProduction ? '0x16547cb6514d3d6b5be1578595fd65045dd10677' : '0x16547cb6514d3d6b5be1578595fd65045dd10677',
                    decimals: 18,
                    icon: CFXIcon,
                    PeggedToken: {
                        name: 'Pegged BSC Conflux',
                        symbol: 'Peggedmt',
                        address: isProduction ? '0x16547cb6514d3d6b5be1578595fd65045dd10677' : '0x16547cb6514d3d6b5be1578595fd65045dd10677',
                        decimals: 18,
                        icon: TokenDefaultIcon,
                        isPeggedToken: true
                    },
                },
            ],
        },
    ],
};

export default Config;
