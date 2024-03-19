package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
)

func (k Keeper) ImportState(ctx sdk.Context, genState types.GenesisState) error {
	s := k.storeService.OpenKVStore(ctx)
	for _, kv := range genState.Kv {
		if err := s.Set(kv.Key, kv.Value); err != nil {
			return err
		}
	}
	return nil
}

func (k Keeper) ExportState(ctx sdk.Context) ([]types.KVPair, error) {
	s := k.storeService.OpenKVStore(ctx)
	iterator, err := s.Iterator(nil, nil)
	if err != nil {
		return nil, err
	}
	defer iterator.Close()

	var keyvalues []types.KVPair
	for ; iterator.Valid(); iterator.Next() {
		keyvalues = append(keyvalues, types.KVPair{
			Key:   iterator.Key(),
			Value: iterator.Value(),
		})
	}

	return keyvalues, nil
}
