import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// const data = [
//   {
//     name: 'Jan',
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: 'Feb',
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: 'Mar',
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: 'Apr',
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: 'May',
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: 'Jun',
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: 'Jul',
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: 'Aug',
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: 'Sep',
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: 'Oct',
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: 'Nov',
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: 'Dec',
//     total: Math.floor(Math.random() * 50) + 10,
//   },
// ];

function Overview({
  data,
}: {
  data: {
    id: number;
    name: string;
    total: number;
  }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
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
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-red-500"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Overview;
