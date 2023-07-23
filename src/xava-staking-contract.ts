import {
	Deposit as DepositedEvent,
	Withdraw as WithdrawEvent
} from "../generated/XavaStakingContract/XavaStakingContract";
import { Deposit, Withdraw } from "../generated/schema";

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
}
