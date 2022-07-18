import { Network } from "@prisma/client";
import Cryptr from "cryptr";
import "../setup.js";
import { networksRepository } from "../repositories/networks.repository.js";

const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);

export type CreateNetworkData = Partial<Network>;

const getNetworkByIdAndUser = async (id: number, user_id: number) => {
	const network = await networksRepository.getNetworkByIdAndUser(id, user_id);
	if (!network) {
		throw {
			type: "not_found",
			message: "Network does not exist or you do not have access to it",
		};
	}
	return network;
};

const insert = async (network: CreateNetworkData) => {
  network.password = cryptr.encrypt(network.password);
  await networksRepository.insert(network);
}

const getOne = async (id: number, user_id: number) => {
  const network = await getNetworkByIdAndUser(id, user_id);
  network.password = cryptr.decrypt(network.password);
  return network;
}

const getAll = async (user_id: number) => {
  const networks = await networksRepository.getNetworksByUser(user_id);
  networks.forEach((network) => {
    network.password = cryptr.decrypt(network.password);
  });
  return networks;
}

const deleteNetwork = async (id: number, user_id: number) => {
  await getNetworkByIdAndUser(id, user_id);
  await networksRepository.deleteNetwork(id);
}

export const networksService = {
  getOne,
  getAll,
  insert,
  deleteNetwork,
};
