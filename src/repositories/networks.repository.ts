import { client } from "../config/database.js";
import { CreateNetworkData } from "../services/networks.service.js";

const getNetworkByIdAndUser = async (id: number, user_id: number) => {
	return await client.network.findFirst({
		where: {
			id,
			user: {
				id: user_id,
			},
		},
	});
};

const getNetworksByUser = async (user_id: number) => {
  return await client.network.findMany({
    where: {
      user: {
        id: user_id,
      },
    },
  });
}

const insert = async (network: CreateNetworkData) => {
  await client.network.create({
    data: {
      name: network.name,
      password: network.password,
      label : network.label,
      user: {
        connect: {
          id: network.user_id,
        },
      },
    },
  });
}

const deleteNetwork = async (id: number) => {
  await client.network.delete({
    where: {
      id,
    },
  });
}

export const networksRepository = {
  getNetworkByIdAndUser,
  getNetworksByUser,
  insert,
  deleteNetwork,
};
