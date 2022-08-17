import { useEffect, useState, useMemo } from 'react';
import Title from 'payment/src/components/Title';
import { useParams } from 'react-router-dom';
import { getAPP } from 'payment/src/utils/request';
import { APPDataSourceType } from 'payment/src/utils/types';
import Address from 'payment/src/components/Address';
import Networks from 'common/conf/Networks';
import { APPDetailRow, APPDetailCard } from 'payment/src/components/APPDetail';
import lodash from 'lodash';
import BN from 'bn.js';
import { DECIMALS } from 'payment/src/contracts/constants';
import * as col from 'payment/src/utils/columns/resources';
import { Table } from 'antd';

export default () => {
    const { address } = useParams();
    const [data, setData] = useState<APPDataSourceType>({
        name: '',
        baseURL: '',
        owner: '',
        earnings: '',
        requests: 0,
        users: 0,
        resources: {
            list: [],
            total: 0,
        },
    });
    const [loading, setLoading] = useState<boolean>(false);
    const config = [
        {
            text: 'Details',
            active: true,
        },
        {
            text: 'Users',
            link: `/payment/provider/app/${address}/users`,
        },
    ];

    useEffect(() => {
        async function main() {
            if (address) {
                setLoading(true);
                const data = await getAPP(address);
                setData(data);
                setLoading(false);
            }
        }
        main().catch((e) => {
            setLoading(false);
            console.log(e);
        });
    }, [address]);

    const columns = useMemo(() => [col.index, col.resource, col.weight, col.requests, col.effectTime].map((c, i) => ({ ...c, width: [1, 4, 4, 4, 4][i] })), []);

    return (
        <div>
            <Title config={config} backTo="/payment/provider/apps"></Title>

            <APPDetailRow
                details={[
                    {
                        label: 'APP Name',
                        content: data.name || '-',
                    },
                    {
                        label: 'APP Address',
                        content: address ? <Address link={`${Networks.eSpace.blockExplorerUrls[0]}/address/${address}`}>{address as string}</Address> : '-',
                    },
                    {
                        label: 'BaseURL',
                        content: data.baseURL || '-',
                    },
                    {
                        label: 'Owner',
                        content: address ? <Address link={`${Networks.eSpace.blockExplorerUrls[0]}/address/${data.owner}`}>{data.owner}</Address> : '-',
                    },
                ]}
            />

            <div className="mt-4"></div>

            <APPDetailCard
                details={[
                    {
                        label: 'Earning',
                        content: lodash.isNil(data.earnings) ? '-' : new BN(data.earnings).div(new BN(DECIMALS[18])).toNumber(),
                    },
                    {
                        label: 'APIs',
                        content: data.resources.total || '-',
                    },
                    {
                        label: 'Requests',
                        content: lodash.isNil(data.requests) ? '-' : data.requests,
                    },
                    {
                        label: 'Users',
                        content: lodash.isNil(data.users) ? '-' : data.users,
                    },
                ]}
            />

            <div className="mt-8 mb-4 text-xl">APIs</div>

            <Table
                dataSource={data.resources.list}
                columns={columns}
                size="small"
                rowKey="resourceId"
                scroll={{ x: 800 }}
                pagination={false}
                loading={loading}
            />
        </div>
    );
};
