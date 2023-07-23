import {
	Deposit as DepositedEvent,
	Withdraw as WithdrawEvent
} from "../generated/XavaStakingContract/XavaStakingContract";
import { Deposit, Withdraw, Staking } from "../generated/schema";

import { BigInt, Bytes } from "@graphprotocol/graph-ts";

export function handleDeposit(event: DepositedEvent): void {
	let entity = new Deposit(
		event.transaction.hash.concatI32(event.logIndex.toI32())
	);
	entity.user = event.params.user;
	entity.amount = event.params.amount;

	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;

	entity.save();

	let staking = new Staking(
		Bytes.fromHexString(
			event.params.user.toHexString() + event.transaction.hash.toHexString()
		)
	);

	staking.user = event.params.user;
	staking.amount = event.params.amount;
	staking.withdraw = BigInt.fromI32(0);
	staking.deposit = BigInt.fromI32(1);
	staking.blockNumber = event.block.number;
	staking.blockTimestamp = event.block.timestamp;
	staking.transactionHash = event.transaction.hash;

	staking.save();
}

export function handleWithdraw(event: WithdrawEvent): void {
	let entity = new Withdraw(
		event.transaction.hash.concatI32(event.logIndex.toI32())
	);
	entity.user = event.params.user;
	entity.amount = event.params.amount;

	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;

	entity.save();

	let staking = new Staking(
		Bytes.fromHexString(
			event.params.user.toHexString() + event.transaction.hash.toHexString()
		)
	);

	staking.user = event.params.user;
	staking.amount = event.params.amount;
	staking.withdraw = BigInt.fromI32(1);
	staking.deposit = BigInt.fromI32(0);
	staking.blockNumber = event.block.number;
	staking.blockTimestamp = event.block.timestamp;
	staking.transactionHash = event.transaction.hash;

	staking.save();
}
