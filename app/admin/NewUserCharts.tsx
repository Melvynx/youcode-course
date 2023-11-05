'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export type NewUserChartsProps = {
  data: {
    date: string;
    newUsersCount: number;
    canceledUsersCount: number;
  }[];
};

export const NewUserCharts = (props: NewUserChartsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users course activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={props.data}>
            <Bar
              dataKey="newUsersCount"
              radius={[4, 4, 0, 0]}
              type="monotone"
              style={{
                fill: 'hsl(var(--primary) / 1)',
              }}
            />
            <Bar
              dataKey="canceledUsersCount"
              radius={[4, 4, 0, 0]}
              type="monotone"
              style={{
                fill: 'hsl(var(--secondary) / 1)',
              }}
            />
            <XAxis dataKey="date" />
            <YAxis dataKey="newUsersCount" />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
