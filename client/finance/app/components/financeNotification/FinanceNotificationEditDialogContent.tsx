/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect } from 'react';

import { FinanceNotificationConditionType, FINANCE_NOTIFICATION_CONDITION_TYPE, FinanceNotificationModeType, FINANCE_NOTIFICATION_MODE, BUY_CONDITIONS, SELL_CONDITIONS, FINANCE_NOTIFICATION_FREQUENCY, FinanceNotificationFrequencyType, FinanceNotificationConditionWithFrequency } from '@finance/types/FinanceNotificationType';
import { FinanceNotificationDataType } from '@finance/interfaces/data/FinanceNotificationDataType';

import BasicSelect from '@client-common/components/inputs/Selects/BasicSelect';
import CurrencyNumberField from '@client-common/components/inputs/TextFields/CurrencyNumberField';
import ControlledCheckbox from '@client-common/components/inputs/checkbox/ControlledCheckbox';
import BasicRadioGroup from '@client-common/components/inputs/RadioGroups/BasicRadioGroup';

import ExchangeUtil from '@/utils/ExchangeUtil';
import TickerUtil from '@/utils/TickerUtil';
import SessionUtil from '@/utils/SessionUtil';
import SessionSelect from '@/app/components/common/SessionSelect';
import { ExchangeDataType } from '@/interfaces/data/ExchangeDataType';
import { TickerDataType } from '@/interfaces/data/TickerDataType';
import { StateType } from '@/app/finance-notification/page';

interface FinanceNotificationEditDialogContentProps {
    item: FinanceNotificationDataType;
    state: StateType;
    onItemChange: (item: FinanceNotificationDataType) => void;
    onStateChange: (state: StateType) => void;
    loading?: boolean;
    exchanges: ExchangeDataType[];
    tickers: TickerDataType[];
}

// Condition labels for the notification system
const conditionLabels: Record<FinanceNotificationConditionType, string> = {
    [FINANCE_NOTIFICATION_CONDITION_TYPE.GREATER_THAN]: '指定価格を上回る',
    [FINANCE_NOTIFICATION_CONDITION_TYPE.LESS_THAN]: '指定価格を下回る', 
    [FINANCE_NOTIFICATION_CONDITION_TYPE.THREE_RED_SOLDIERS]: 'Three Red Soldiers (赤三兵)',
    [FINANCE_NOTIFICATION_CONDITION_TYPE.THREE_RIVER_EVENING_STAR]: 'Three River Evening Star (三川明けの明星)',
    [FINANCE_NOTIFICATION_CONDITION_TYPE.TWO_TAKURI_LINES]: '二本たくり線',
    [FINANCE_NOTIFICATION_CONDITION_TYPE.SWALLOW_RETURN]: 'つばめ返し',
    [FINANCE_NOTIFICATION_CONDITION_TYPE.FIREWORKS]: '仕掛け花火',
    [FINANCE_NOTIFICATION_CONDITION_TYPE.OKAJI_THREE_CROWS]: '岡時三羽',
    [FINANCE_NOTIFICATION_CONDITION_TYPE.FALLING_STONES]: '小石崩れ',
    [FINANCE_NOTIFICATION_CONDITION_TYPE.BULLISH_HARAMI_CROSS]: '陽の両はらみ',
    [FINANCE_NOTIFICATION_CONDITION_TYPE.BEARISH_HARAMI_CROSS]: '陰の両はらみ',
    [FINANCE_NOTIFICATION_CONDITION_TYPE.HAWK_REVERSAL]: '鷹かえし',
    [FINANCE_NOTIFICATION_CONDITION_TYPE.THREE_DARK_STARS]: '陰の三つ星',
    [FINANCE_NOTIFICATION_CONDITION_TYPE.SHOOTING_STAR]: '流れ星',
};

// Condition descriptions - function to provide context-aware descriptions
const getConditionDescription = (conditionType: FinanceNotificationConditionType, mode?: FinanceNotificationModeType): string => {
    switch (conditionType) {
        case FINANCE_NOTIFICATION_CONDITION_TYPE.GREATER_THAN:
            if (mode === FINANCE_NOTIFICATION_MODE.BUY) {
                return '株価が指定した価格を上回った時に通知します（ブレイクアウト買いなど）';
            } else if (mode === FINANCE_NOTIFICATION_MODE.SELL) {
                return '株価が指定した価格を上回った時に通知します（利益確定売りなど）';
            } else {
                return '株価が指定した価格を上回った時に通知します';
            }
        case FINANCE_NOTIFICATION_CONDITION_TYPE.LESS_THAN:
            if (mode === FINANCE_NOTIFICATION_MODE.BUY) {
                return '株価が指定した価格を下回った時に通知します（押し目買いなど）';
            } else if (mode === FINANCE_NOTIFICATION_MODE.SELL) {
                return '株価が指定した価格を下回った時に通知します（損切り売りなど）';
            } else {
                return '株価が指定した価格を下回った時に通知します';
            }
        case FINANCE_NOTIFICATION_CONDITION_TYPE.THREE_RED_SOLDIERS:
            return '3本の連続する強気ローソク足パターンを検出した時に通知します';
        case FINANCE_NOTIFICATION_CONDITION_TYPE.THREE_RIVER_EVENING_STAR:
            return '潜在的な反転シグナルパターンを検出した時に通知します';
        case FINANCE_NOTIFICATION_CONDITION_TYPE.TWO_TAKURI_LINES:
            return '安値がほぼ同じような下影陰線が２本現れた後、同じような安値の寄引同事線が出た買いシグナルを検出した時に通知します';
        case FINANCE_NOTIFICATION_CONDITION_TYPE.SWALLOW_RETURN:
            return '前日終値より高い始値を付けたが陰線で終わることが２回連続した後に陽線が現れた買いシグナルを検出した時に通知します';
        case FINANCE_NOTIFICATION_CONDITION_TYPE.FIREWORKS:
            return '長い上ヒゲと短い実体部を持ち下ヒゲがほぼない売りシグナルを検出した時に通知します';
        case FINANCE_NOTIFICATION_CONDITION_TYPE.OKAJI_THREE_CROWS:
            return '3本の陰線が並び、各ローソク足の終値と次の始値が同じパターンの売りシグナルを検出した時に通知します';
        case FINANCE_NOTIFICATION_CONDITION_TYPE.FALLING_STONES:
            return '大陽線の後、徐々に安値を切り下げる下降ウェッジの売りシグナルを検出した時に通知します';
        case FINANCE_NOTIFICATION_CONDITION_TYPE.BULLISH_HARAMI_CROSS:
            return '大陽線の翌営業日に出た陽線が、前営業日の大陽線の実体の範囲内に納まる買いシグナルを検出した時に通知します';
        case FINANCE_NOTIFICATION_CONDITION_TYPE.BEARISH_HARAMI_CROSS:
            return '大陰線の翌営業日に出た陰線が、前営業日の大陰線の実体の範囲内に納まる売りシグナルを検出した時に通知します';
        case FINANCE_NOTIFICATION_CONDITION_TYPE.HAWK_REVERSAL:
            return '上昇中に陰線が前のローソク足を包み込んだ売りシグナルを検出した時に通知します';
        case FINANCE_NOTIFICATION_CONDITION_TYPE.THREE_DARK_STARS:
            return '小陰線などの胴体の短いローソク足が3つ連続して現れる売りシグナルを検出した時に通知します';
        case FINANCE_NOTIFICATION_CONDITION_TYPE.SHOOTING_STAR:
            return '上昇トレンド中高値圏で出る長い上ヒゲ・短い実体の売りシグナルを検出した時に通知します';
        default:
            return '';
    }
};

export default function FinanceNotificationEditDialogContent({
    item,
    state,
    onItemChange,
    onStateChange,
    loading,
    exchanges,
    tickers,
}: FinanceNotificationEditDialogContentProps) {
    // Helper function to parse selected conditions with frequency (both old and new formats)
    const getSelectedConditionsWithFrequency = (): FinanceNotificationConditionWithFrequency[] => {
        if (item.conditions) {
            try {
                const conditions = JSON.parse(item.conditions);
                
                // Check if it's the new format (array of objects with type and frequency)
                if (Array.isArray(conditions) && conditions.length > 0 && typeof conditions[0] === 'object' && conditions[0].type) {
                    return conditions as FinanceNotificationConditionWithFrequency[];
                }
                
                // Legacy format (array of strings) - convert to new format
                if (Array.isArray(conditions)) {
                    const defaultFrequency = item.frequency || FINANCE_NOTIFICATION_FREQUENCY.MINUTE_LEVEL;
                    return conditions.map((conditionType: string) => ({
                        type: conditionType as FinanceNotificationConditionType,
                        frequency: defaultFrequency
                    }));
                }
            } catch (error) {
                console.error('Error parsing conditions:', error);
                return [];
            }
        }
        return [];
    };

    // Helper function to get just the condition types for legacy compatibility
    const getSelectedConditions = (): FinanceNotificationConditionType[] => {
        return getSelectedConditionsWithFrequency().map(c => c.type);
    };

    // Helper function to update condition frequency
    const updateConditionFrequency = (conditionType: FinanceNotificationConditionType, frequency: FinanceNotificationFrequencyType) => {
        const conditionsWithFreq = getSelectedConditionsWithFrequency();
        const updatedConditions = conditionsWithFreq.map(c => 
            c.type === conditionType ? { ...c, frequency } : c
        );
        
        onItemChange({
            ...item,
            conditions: JSON.stringify(updatedConditions)
        });
    };

    // Helper function to update selected conditions with mutual exclusivity for price conditions
    const updateConditions = (conditionType: FinanceNotificationConditionType, checked: boolean) => {
        let conditionsWithFreq = getSelectedConditionsWithFrequency();
        
        if (checked) {
            // If selecting a price condition, remove the other price condition first
            if (conditionType === FINANCE_NOTIFICATION_CONDITION_TYPE.GREATER_THAN) {
                conditionsWithFreq = conditionsWithFreq.filter(c => c.type !== FINANCE_NOTIFICATION_CONDITION_TYPE.LESS_THAN);
            } else if (conditionType === FINANCE_NOTIFICATION_CONDITION_TYPE.LESS_THAN) {
                conditionsWithFreq = conditionsWithFreq.filter(c => c.type !== FINANCE_NOTIFICATION_CONDITION_TYPE.GREATER_THAN);
            }
            
            if (!conditionsWithFreq.some(c => c.type === conditionType)) {
                // Add new condition with default frequency
                const defaultFrequency = item.frequency || FINANCE_NOTIFICATION_FREQUENCY.MINUTE_LEVEL;
                conditionsWithFreq.push({
                    type: conditionType,
                    frequency: defaultFrequency
                });
            }
        } else {
            conditionsWithFreq = conditionsWithFreq.filter(c => c.type !== conditionType);
        }
        
        onItemChange({
            ...item,
            conditions: JSON.stringify(conditionsWithFreq)
        });
    };

    // Determine if condition value is needed
    const selectedConditions = getSelectedConditions();
    const needsConditionValue = selectedConditions.includes(FINANCE_NOTIFICATION_CONDITION_TYPE.GREATER_THAN) || selectedConditions.includes(FINANCE_NOTIFICATION_CONDITION_TYPE.LESS_THAN);

    useEffect(() => {
        if (exchanges.length === 0 || tickers.length === 0) {
            return;
        }

        const exchangeId = item.exchangeId.trim() === '' ? exchanges[0].id : item.exchangeId;
        const filteredTickers = tickers.filter(t => t.exchange === exchangeId);
        const tickerId = filteredTickers.find(t => t.id === item.tickerId)
            ? item.tickerId
            : (filteredTickers.length > 0 ? filteredTickers[0].id : '');

        // Ensure new items have a default mode and session if not set
        const mode = item.mode || FINANCE_NOTIFICATION_MODE.BUY;
        const session = item.session || SessionUtil.getDefaultSession();

        onItemChange({
            ...item,
            exchangeId: exchangeId,
            tickerId: tickerId,
            mode: mode,
            session: session,
            conditions: item.conditions || JSON.stringify([])
        });
        onStateChange({ ...state, filteredTickers });
    }, [exchanges, tickers]);

    return (
        <>
            <BasicSelect
                label='Exchange'
                options={ExchangeUtil.dataToSelectOptions(exchanges)}
                value={item.exchangeId}
                disabled={loading}
                onChange={(value) => {
                    const filteredTickers = tickers.filter(t => t.exchange === value);
                    onItemChange({ ...item, exchangeId: value, tickerId: filteredTickers.length > 0 ? filteredTickers[0].id : '' });
                    onStateChange({ ...state, filteredTickers });
                }}
            />
            <BasicSelect
                label='Ticker'
                options={TickerUtil.dataToSelectOptions(state.filteredTickers)}
                value={item.tickerId}
                disabled={loading || !item.exchangeId}
                onChange={(value) => onItemChange({ ...item, tickerId: value })}
            />
            
            {/* Session Selection */}
            <SessionSelect
                value={item.session || SessionUtil.getDefaultSession()}
                disabled={loading}
                onChange={(value) => onItemChange({ ...item, session: value })}
            />
            
            {/* Mode Selection */}
            <BasicRadioGroup
                label="通知モード"
                name="notificationMode"
                value={item.mode || FINANCE_NOTIFICATION_MODE.BUY}
                options={[
                    { label: '買い', value: FINANCE_NOTIFICATION_MODE.BUY },
                    { label: '売り', value: FINANCE_NOTIFICATION_MODE.SELL }
                ]}
                row={true}
                disabled={loading}
                onChange={(e) => {
                    const newMode = e.target.value as FinanceNotificationModeType;
                    onItemChange({
                        ...item,
                        mode: newMode,
                        conditions: JSON.stringify([])
                    });
                }}
            />

            {/* New mode-based condition selection */}
            <div style={{ marginTop: '16px' }}>
                <h3 style={{ marginBottom: '16px', fontSize: '1.25rem', fontWeight: 500 }}>
                    {item.mode === FINANCE_NOTIFICATION_MODE.BUY ? '買い条件' : '売り条件'}
                </h3>
                
                {(item.mode === FINANCE_NOTIFICATION_MODE.BUY ? BUY_CONDITIONS : SELL_CONDITIONS).map((conditionType) => {
                    // Check if this is a price condition that should be disabled due to mutual exclusivity
                    const isPriceCondition = conditionType === FINANCE_NOTIFICATION_CONDITION_TYPE.GREATER_THAN || conditionType === FINANCE_NOTIFICATION_CONDITION_TYPE.LESS_THAN;
                    const isOtherPriceConditionSelected = isPriceCondition && selectedConditions.some(c => 
                        c !== conditionType && (c === FINANCE_NOTIFICATION_CONDITION_TYPE.GREATER_THAN || c === FINANCE_NOTIFICATION_CONDITION_TYPE.LESS_THAN)
                    );
                    const isCurrentlySelected = selectedConditions.includes(conditionType);
                    const isDisabled = loading || (isPriceCondition && isOtherPriceConditionSelected && !isCurrentlySelected);
                    
                    // Get current frequency for this condition
                    const conditionsWithFreq = getSelectedConditionsWithFrequency();
                    const currentCondition = conditionsWithFreq.find(c => c.type === conditionType);
                    const currentFrequency = currentCondition?.frequency || FINANCE_NOTIFICATION_FREQUENCY.MINUTE_LEVEL;

                    return (
                        <div key={conditionType} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                            <ControlledCheckbox
                                label={conditionLabels[conditionType]}
                                checked={isCurrentlySelected}
                                disabled={isDisabled}
                                onChange={(e) => updateConditions(conditionType, e.target.checked)}
                            />
                            <p style={{ marginLeft: '32px', marginTop: '4px', fontSize: '0.875rem', color: '#666' }}>
                                {getConditionDescription(conditionType, item.mode)}
                            </p>
                            
                            {/* Frequency selection for each condition */}
                            {isCurrentlySelected && (
                                <div style={{ marginLeft: '32px', marginTop: '12px' }}>
                                    <BasicSelect
                                        label="通知頻度"
                                        options={[
                                            { 
                                                label: '1分ごと', 
                                                value: FINANCE_NOTIFICATION_FREQUENCY.MINUTE_LEVEL,
                                            },
                                            { 
                                                label: '10分ごと', 
                                                value: FINANCE_NOTIFICATION_FREQUENCY.TEN_MINUTE_LEVEL,
                                            },
                                            { 
                                                label: '1時間ごと', 
                                                value: FINANCE_NOTIFICATION_FREQUENCY.HOURLY_LEVEL,
                                            },
                                            { 
                                                label: '取引開始時のみ', 
                                                value: FINANCE_NOTIFICATION_FREQUENCY.EXCHANGE_START_ONLY,
                                            }
                                        ]}
                                        value={currentFrequency}
                                        disabled={loading}
                                        onChange={(value) => {
                                            const newFrequency = value as FinanceNotificationFrequencyType;
                                            updateConditionFrequency(conditionType, newFrequency);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            
            {needsConditionValue && (
                <CurrencyNumberField
                    label='目標価格'
                    value={item.conditionValue}
                    disabled={loading}
                    onChange={(value) => onItemChange({ ...item, conditionValue: Number(value.target.value) })}
                    onValueChange={(value) => onItemChange({ ...item, conditionValue: value })}
                />
            )}
        </>
    );
}
