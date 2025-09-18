/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';

import { ConditionInfo } from '@finance/conditions/ConditionBase';
import { ExchangeSessionType } from '@finance/types/ExchangeTypes';
import { FinanceNotificationCondition } from '@finance/interfaces/FinanceNotificationType';
import { FinanceNotificationConditionModeType, FinanceNotificationFrequencyType } from '@finance/types/FinanceNotificationType';
import { FINANCE_NOTIFICATION_CONDITION_MODE, FINANCE_NOTIFICATION_FREQUENCY } from '@finance/consts/FinanceNotificationConst';

import BasicRadioGroup from '@client-common/components/inputs/RadioGroups/BasicRadioGroup';
import BasicSelect from '@client-common/components/inputs/Selects/BasicSelect';
import CurrencyNumberField from '@client-common/components/inputs/TextFields/CurrencyNumberField';
import { SelectOptionType } from '@client-common/interfaces/SelectOptionType';

import FinanceNotificationConditionFetchService from '@/services/financeNotification/FinanceNotificationConditionFetchService.client';
import FrequencyUtil from '@/utils/finance-notification/FrequencyUtil';
import ModeUtil from '@/utils/finance-notification/ModeUtil';
import SessionSelect from '@/app/components/common/SessionSelect';
import SessionUtil from '@/utils/SessionUtil';

interface FinanceNotificationEditDialogContentProps {
    item: FinanceNotificationCondition;
    onItemChange: (item: FinanceNotificationCondition) => void;
    isNew: boolean;
    loading?: boolean;
}

export default function FinanceNotificationConditionEditDialogContent({
    item,
    onItemChange,
    isNew,
    loading
}: FinanceNotificationEditDialogContentProps) {
    // Debug logging to understand the data flow
    console.log('FinanceNotificationConditionEditDialogContent rendered with:', {
        isNew,
        'item.conditionName': item.conditionName,
        'item.targetPrice': item.targetPrice,
        'item (full)': item
    });

    const [conditions, setConditions] = useState<SelectOptionType[]>([]);
    const [conditionInfo, setConditionInfo] = useState<ConditionInfo>({
        name: '',
        description: '',
        isBuyCondition: false,
        isSellCondition: false,
        enableTargetPrice: false,
    });

    const conditionFetchService = new FinanceNotificationConditionFetchService();

    const initializeConditions = (): void => {
        onItemChange({
            ...item,
            conditionName: conditions[0].value,
            frequency: FINANCE_NOTIFICATION_FREQUENCY.MINUTE_LEVEL,
            session: SessionUtil.getDefaultSession(),
            targetPrice: null,
            firstNotificationSent: false,
        });
    }

    useEffect(() => {
        (async () => {
            const fetchedConditions = await conditionFetchService.getConditionList(item.mode);
            setConditions(fetchedConditions);
        })();
    }, [item.mode]);

    useEffect(() => {
        if (!isNew) return;

        if (conditions.length === 0) return;

        if (conditions[0].value === item.conditionName) return;

        initializeConditions();
    }, [conditions]);

    useEffect(() => {
        if (!item.conditionName) return;

        (async () => {
            const info = await conditionFetchService.getConditionInfo(item.conditionName);
            console.log('Fetched conditionInfo:', info);
            setConditionInfo(info);
        })();
    }, [item.conditionName]);

    useEffect(() => {
        if (!item.conditionName) return;
        if (conditionInfo.name !== item.conditionName) return;

        console.log('conditionInfo effect triggered:', {
            'conditionInfo.enableTargetPrice': conditionInfo.enableTargetPrice,
            'item.targetPrice': item.targetPrice,
            'isNew': isNew
        });

        if (!conditionInfo.enableTargetPrice) {
            console.log('Setting targetPrice to null because enableTargetPrice is false');
            onItemChange({
                ...item,
                targetPrice: null,
            });
        } else {
            // Only set targetPrice to 1 if it's a new item and targetPrice is null
            // For existing items, preserve the current targetPrice value
            if (isNew && item.targetPrice === null) {
                console.log('Setting targetPrice to 1 for new item with null targetPrice');
                onItemChange({
                    ...item,
                    targetPrice: 1,
                });
            } else {
                console.log('Preserving existing targetPrice:', item.targetPrice);
            }
        }
    }, [conditionInfo]);

    return (
        <>
            <BasicRadioGroup
                label="モード"
                name="notificationMode"
                value={item.mode || FINANCE_NOTIFICATION_CONDITION_MODE.BUY}
                options={ModeUtil.getModeOptions()}
                row={true}
                disabled={!isNew || loading}
                onChange={(e) => {
                    const newMode = e.target.value as FinanceNotificationConditionModeType;
                    onItemChange({
                        ...item,
                        mode: newMode,
                    });
                }}
            />
            <BasicSelect
                label='条件'
                options={conditions}
                value={item.conditionName}
                disabled={!isNew || loading || conditions.length === 0}
                onChange={(value) => {
                    onItemChange({
                        ...item,
                        conditionName: value,
                    });
                }}
            />
            <BasicSelect
                label='通知頻度'
                options={FrequencyUtil.getFrequencyOptions()}
                value={item.frequency}
                disabled={loading}
                onChange={(value) => {
                    onItemChange({
                        ...item,
                        frequency: value as FinanceNotificationFrequencyType,
                    });
                }}
            />
            <SessionSelect
                value={item.session}
                disabled={loading}
                onChange={(value) => {
                    onItemChange({
                        ...item,
                        session: value as ExchangeSessionType,
                    });
                }}
            />
            {conditionInfo.enableTargetPrice && (
                <CurrencyNumberField
                    label='目標価格'
                    value={(() => {
                        const value = item.targetPrice !== null ? item.targetPrice : 0;
                        console.log('CurrencyNumberField value:', {
                            'item.targetPrice': item.targetPrice,
                            'computed value': value
                        });
                        return value;
                    })()}
                    disabled={loading}
                    onChange={(value) => {
                        console.log('CurrencyNumberField onChange:', value);
                        onItemChange({
                            ...item,
                            targetPrice: Number(value.target.value)
                        })
                    }}
                    onValueChange={(value) => {
                        console.log('CurrencyNumberField onValueChange:', value);
                        // Ensure the target price is not negative
                        const validValue = Math.max(0, value);
                        onItemChange({
                            ...item,
                            targetPrice: validValue
                        })
                    }}
                />
            )}
        </>
    );
}
