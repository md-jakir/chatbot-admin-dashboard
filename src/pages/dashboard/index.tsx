import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import CalendarDateRangePicker from '@/components/sections/dashboard/date-range-picker';
import Overview from '@/components/sections/dashboard/overview';
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import AppointMents from '@/components/sections/dashboard/appointMents';
import { useGetSingleanalyticsQuery } from '@/redux/features/analytics/analytics.api';
import UsersOverTime from '@/components/sections/dashboard/UsersOverTime';
import FeedBackOverview from '@/components/sections/dashboard/FeedBackOverview';
import { useRouter } from 'next/router';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ChatBubbleLeftRightIcon,
  DocumentChartBarIcon,
} from '@heroicons/react/24/outline';

function Dashboard() {
  const router = useRouter();
  const { data, isLoading } = useGetSingleanalyticsQuery<any>('');

  return (
    <div className="mb-4 ">
      <div className="items-center justify-between space-y-2 md:flex">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex flex-col space-x-2 md:flex-row md:items-center">
          <CalendarDateRangePicker />
          <Button className=" mt-2 md:mt-0">Download</Button>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            <Skeleton className="h-28 w-full" />
          ) : (
            <Card className="bg-gradient-to-r from-purple-600 to-purple-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-gray-300"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.total_unique_user_count}
                </div>
              </CardContent>
            </Card>
          )}
          {isLoading ? (
            <Skeleton className="h-full min-h-20 w-full" />
          ) : (
            <Card className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  AVG Conversations Per User
                </CardTitle>
                <ChatBubbleLeftRightIcon className="h-4 w-4 text-gray-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.sessions_per_user.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          )}
          {isLoading ? (
            <Skeleton className="h-full min-h-20 w-full" />
          ) : (
            <Card className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Messages Per Session
                </CardTitle>
                <ChatBubbleIcon className="h-4 w-4 text-gray-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.average_messages_per_session?.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          )}
          {isLoading ? (
            <Skeleton className="h-full min-h-20 w-full" />
          ) : (
            <Card className="bg-gradient-to-r from-red-600 to-red-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  User Retention Rate
                </CardTitle>
                <DocumentChartBarIcon className="h-4 w-4 text-gray-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.user_retention_rate.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <div className=" grid min-h-72 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          {isLoading ? (
            <Skeleton className="col-span-12 h-full lg:col-span-5" />
          ) : (
            <Card className="col-span-12 overflow-auto bg-card/30 dark:bg-card lg:col-span-5">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  User Creation Stats for last 6 Months
                </CardDescription>
              </CardHeader>
              <CardContent className="-2">
                <UsersOverTime data={data?.user_creation_stats_per_month} />
              </CardContent>
            </Card>
          )}
          {isLoading ? (
            <Skeleton className="col-span-12 h-full lg:col-span-2" />
          ) : (
            <Card className="col-span-12 overflow-hidden lg:col-span-2">
              <CardHeader>
                <CardTitle>Feedback</CardTitle>
                <CardDescription>
                  Feedback count of the Messages
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <FeedBackOverview data={data?.feedback_counts} />
              </CardContent>
            </Card>
          )}
        </div>
        <div className=" grid min-h-72 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          {isLoading ? (
            <Skeleton className="col-span-12 h-full lg:col-span-4" />
          ) : (
            <Card className="col-span-12 overflow-auto lg:col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  Summary of Message Volume of Chatbots
                </CardDescription>
              </CardHeader>
              <CardContent className="-2">
                <Overview data={data?.message_volume} />
              </CardContent>
            </Card>
          )}
          {isLoading ? (
            <Skeleton className="col-span-12 h-full lg:col-span-3" />
          ) : (
            <Card className="col-span-12 overflow-auto lg:col-span-3">
              <CardHeader>
                <CardTitle>Avg Response Time</CardTitle>
                <CardDescription>Avg Response Time</CardDescription>
              </CardHeader>
              <CardContent>
                <AppointMents data={data?.avg_response_time} />
              </CardContent>
              <div className=" flex justify-end ">
                <Button
                  className="hover:text-blue-500"
                  onClick={() => {
                    router.push('/chatbot');
                  }}
                  variant="ghost"
                >
                  Show more
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

Dashboard.layout = 'dashboard';
export default Dashboard;
