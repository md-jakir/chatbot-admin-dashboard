import React from 'react';

import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function UsersOverTime({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height={200} className="mb-5 mr-6">
      <LineChart data={data || []}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) =>
            `${new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}`
          }
        />

        <Tooltip
          cursor={{ fill: 'rgba(0,0,0,0)' }}
          contentStyle={{
            backgroundColor: 'rgba(0,0,0,0.8)',
            border: 'none',
            color: 'white',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        />

        <Line
          type="monotone"
          dataKey="user_count"
          stroke="#8884d8"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
