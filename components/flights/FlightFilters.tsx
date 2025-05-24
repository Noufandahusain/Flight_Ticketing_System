import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Filter, X } from 'lucide-react-native';
import Theme from '@/constants/Theme';
import Colors from '@/constants/Colors';

interface FilterOption {
  label: string;
  value: string;
}

interface FlightFiltersProps {
  onFilterChange: (filters: any) => void;
}

const priceRanges: FilterOption[] = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under $300', value: 'under300' },
  { label: '$300 - $600', value: '300-600' },
  { label: '$600 - $1000', value: '600-1000' },
  { label: 'Over $1000', value: 'over1000' },
];

const airlines: FilterOption[] = [
  { label: 'All Airlines', value: 'all' },
  { label: 'SkyAir', value: 'skyair' },
  { label: 'Global Airways', value: 'globalairways' },
  { label: 'Horizon', value: 'horizon' },
  { label: 'Ocean Pacific', value: 'oceanpacific' },
];

const stops: FilterOption[] = [
  { label: 'Any Stops', value: 'any' },
  { label: 'Direct Only', value: 'direct' },
  { label: '1 Stop', value: '1stop' },
];

export default function FlightFilters({ onFilterChange }: FlightFiltersProps) {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedAirline, setSelectedAirline] = useState('all');
  const [selectedStops, setSelectedStops] = useState('any');

  const toggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  const applyFilters = () => {
    onFilterChange({
      priceRange: selectedPriceRange,
      airline: selectedAirline,
      stops: selectedStops,
    });
    setIsFiltersVisible(false);
  };

  const resetFilters = () => {
    setSelectedPriceRange('all');
    setSelectedAirline('all');
    setSelectedStops('any');
    onFilterChange({
      priceRange: 'all',
      airline: 'all',
      stops: 'any',
    });
  };

  const FilterButton = ({ options, selectedValue, onSelect }: {
    options: FilterOption[];
    selectedValue: string;
    onSelect: (value: string) => void;
  }) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {options.map((option) => (
        <Pressable
          key={option.value}
          style={[
            styles.filterButton,
            selectedValue === option.value && styles.filterButtonActive,
          ]}
          onPress={() => onSelect(option.value)}
        >
          <Text
            style={[
              styles.filterButtonText,
              selectedValue === option.value && styles.filterButtonTextActive,
            ]}
          >
            {option.label}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.filterToggle} onPress={toggleFilters}>
          <Filter size={20} color={Colors.light.text} />
          <Text style={styles.filterText}>Filters</Text>
        </Pressable>

        <Pressable style={styles.resetButton} onPress={resetFilters}>
          <Text style={styles.resetText}>Reset</Text>
        </Pressable>
      </View>

      {isFiltersVisible && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Price Range</Text>
            <FilterButton
              options={priceRanges}
              selectedValue={selectedPriceRange}
              onSelect={setSelectedPriceRange}
            />
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Airlines</Text>
            <FilterButton
              options={airlines}
              selectedValue={selectedAirline}
              onSelect={setSelectedAirline}
            />
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Stops</Text>
            <FilterButton
              options={stops}
              selectedValue={selectedStops}
              onSelect={setSelectedStops}
            />
          </View>

          <Pressable style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  filterToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.bodyMedium,
    color: Colors.light.text,
    marginLeft: Theme.spacing.xs,
  },
  resetButton: {
    padding: Theme.spacing.xs,
  },
  resetText: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.bodyMedium,
    color: Colors.light.primary,
  },
  filtersContainer: {
    backgroundColor: Colors.light.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    marginHorizontal: Theme.spacing.md,
    ...Theme.elevation.medium,
  },
  filterSection: {
    marginBottom: Theme.spacing.md,
  },
  filterSectionTitle: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.bodySemiBold,
    color: Colors.light.text,
    marginBottom: Theme.spacing.sm,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Theme.borderRadius.md,
    marginRight: Theme.spacing.sm,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  filterButtonActive: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  filterButtonText: {
    fontSize: Theme.typography.fontSizes.sm,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.text,
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
    fontFamily: Theme.typography.fontFamily.bodySemiBold,
  },
  applyButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: Theme.borderRadius.md,
    marginTop: Theme.spacing.sm,
  },
  applyButtonText: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.bodySemiBold,
    color: '#FFFFFF',
  },
});