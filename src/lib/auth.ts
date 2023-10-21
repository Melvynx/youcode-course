import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

type ParametersGetServerSession =
  | []
  | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
  | [NextApiRequest, NextApiResponse];

export const getAuthSession = async (...parameters: ParametersGetServerSession) => {
  const session = await getServerSession(...parameters, authOptions);
  return session;
};
