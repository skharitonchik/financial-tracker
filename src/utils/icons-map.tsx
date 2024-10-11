import { ReactElement } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PaidIcon from '@mui/icons-material/Paid';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import ShopIcon from '@mui/icons-material/Shop';
import DiamondIcon from '@mui/icons-material/Diamond';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MuseumIcon from '@mui/icons-material/Museum';
import HomeIcon from '@mui/icons-material/Home';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import DomainIcon from '@mui/icons-material/Domain';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PropaneIcon from '@mui/icons-material/Propane';
import PropaneTankIcon from '@mui/icons-material/PropaneTank';
import EvStationIcon from '@mui/icons-material/EvStation';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SpaIcon from '@mui/icons-material/Spa';
import ContactlessIcon from '@mui/icons-material/Contactless';
import CarRentalIcon from '@mui/icons-material/CarRental';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import CycloneIcon from '@mui/icons-material/Cyclone';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import SchoolIcon from '@mui/icons-material/School';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import SanitizerIcon from '@mui/icons-material/Sanitizer';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import WifiIcon from '@mui/icons-material/Wifi';

interface IconMap {
  name: string;
  value: string;
  component: ReactElement;
  category: string;
}

// Define icon objects with categories
const icons = [
  //Text Formatting
  {
    name: 'Format Underlined',
    value: 'undefined',
    component: <FormatUnderlinedIcon />,
    category: 'Text Formatting',
  },
  // Shopping Icons
  { name: 'Shopping Cart', value: 'icon-shopping-cart', component: <ShoppingCartIcon />, category: 'Shopping' },
  { name: 'Shopping Basket', value: 'icon-shopping-basket', component: <ShoppingBasketIcon />, category: 'Shopping' },
  { name: 'Shopping Bag', value: 'icon-shopping-bag', component: <ShoppingBagIcon />, category: 'Shopping' },
  {
    name: 'Shopping Cart Checkout',
    value: 'icon-shopping-cart-checkout',
    component: <ShoppingCartCheckoutIcon />,
    category: 'Shopping',
  },
  { name: 'Store', value: 'icon-store', component: <StoreIcon />, category: 'Shopping' },
  { name: 'Storefront', value: 'icon-storefront', component: <StorefrontIcon />, category: 'Shopping' },
  { name: 'Shop', value: 'icon-shop', component: <ShopIcon />, category: 'Shopping' },
  { name: 'Diamond', value: 'icon-diamond', component: <DiamondIcon />, category: 'Shopping' },
  { name: 'Card Giftcard', value: 'icon-card-giftcard', component: <CardGiftcardIcon />, category: 'Shopping' },
  { name: 'Checkroom', value: 'icon-checkroom', component: <CheckroomIcon />, category: 'Shopping' },

  // Transportation Icons
  { name: 'Car Rental', value: 'icon-car-rental', component: <CarRentalIcon />, category: 'Transportation' },
  {
    name: 'Directions Car',
    value: 'icon-directions-car',
    component: <DirectionsCarIcon />,
    category: 'Transportation',
  },
  {
    name: 'Directions Bike',
    value: 'icon-directions-bike',
    component: <DirectionsBikeIcon />,
    category: 'Transportation',
  },
  { name: 'Local Airport', value: 'icon-local-airport', component: <LocalAirportIcon />, category: 'Transportation' },
  {
    name: 'Airplane Ticket',
    value: 'icon-airplane-ticket',
    component: <AirplaneTicketIcon />,
    category: 'Transportation',
  },

  // Utilities Icons
  {
    name: 'Electrical Services',
    value: 'icon-electrical-services',
    component: <ElectricalServicesIcon />,
    category: 'Utilities',
  },
  {
    name: 'Wifi',
    value: 'icon-wifi',
    component: <WifiIcon />,
    category: 'Connectivity',
  },
  { name: 'Electric Bolt', value: 'icon-electric-bolt', component: <ElectricBoltIcon />, category: 'Utilities' },
  {
    name: 'Battery Charging Full',
    value: 'icon-battery-charging-full',
    component: <BatteryChargingFullIcon />,
    category: 'Utilities',
  },
  { name: 'Flash On', value: 'icon-flash-on', component: <FlashOnIcon />, category: 'Utilities' },
  { name: 'Propane', value: 'icon-propane', component: <PropaneIcon />, category: 'Utilities' },
  { name: 'Propane Tank', value: 'icon-propane-tank', component: <PropaneTankIcon />, category: 'Utilities' },
  { name: 'Ev Station', value: 'icon-ev-station', component: <EvStationIcon />, category: 'Utilities' },

  // Business Icons
  {
    name: 'Account Balance Wallet',
    value: 'icon-account-balance-wallet',
    component: <AccountBalanceWalletIcon />,
    category: 'Business',
  },
  {
    name: 'Currency Exchange',
    value: 'icon-currency-exchange',
    component: <CurrencyExchangeIcon />,
    category: 'Business',
  },
  { name: 'Paid', value: 'icon-paid', component: <PaidIcon />, category: 'Business' },
  { name: 'Point Of Sale', value: 'icon-point-of-sale', component: <PointOfSaleIcon />, category: 'Business' },
  { name: 'Price Check', value: 'icon-price-check', component: <PriceCheckIcon />, category: 'Business' },
  { name: 'Add Business', value: 'icon-add-business', component: <AddBusinessIcon />, category: 'Business' },
  { name: 'Domain', value: 'icon-domain', component: <DomainIcon />, category: 'Business' },
  { name: 'Credit Score', value: 'icon-credit-score', component: <CreditScoreIcon />, category: 'Business' },

  // Health & Wellness Icons
  {
    name: 'Health And Safety',
    value: 'icon-health-and-safety',
    component: <HealthAndSafetyIcon />,
    category: 'Health & Wellness',
  },
  {
    name: 'Fitness Center',
    value: 'icon-fitness-center',
    component: <FitnessCenterIcon />,
    category: 'Health & Wellness',
  },
  { name: 'Spa', value: 'icon-spa', component: <SpaIcon />, category: 'Health & Wellness' },

  // Miscellaneous Icons
  {
    name: 'Cyclone',
    value: 'icon-cyclone',
    component: <CycloneIcon />,
    category: 'Miscellaneous', // Adjust category as needed based on your use case
  },
  { name: 'Pets', value: 'icon-pets', component: <PetsIcon />, category: 'Miscellaneous' },
  { name: 'Museum', value: 'icon-museum', component: <MuseumIcon />, category: 'Miscellaneous' },
  { name: 'Home', value: 'icon-home', component: <HomeIcon />, category: 'Miscellaneous' },
  { name: 'Contactless', value: 'icon-contactless', component: <ContactlessIcon />, category: 'Miscellaneous' },
  { name: 'Card Travel', value: 'icon-card-travel', component: <CardTravelIcon />, category: 'Miscellaneous' },
  {
    name: 'Videogame Asset',
    value: 'icon-videogame-asset',
    component: <VideogameAssetIcon />,
    category: 'Miscellaneous',
  },

  {
    name: 'School',
    value: 'icon-school',
    component: <SchoolIcon />,
    category: 'Education',
  },
  {
    name: 'Local Library',
    value: 'icon-local-library',
    component: <LocalLibraryIcon />,
    category: 'Education',
  },
  {
    name: 'Lightbulb',
    value: 'icon-lightbulb',
    component: <LightbulbIcon />,
    category: 'Ideas',
  },
  {
    name: 'Delete Forever',
    value: 'icon-delete-forever',
    component: <DeleteForeverIcon />,
    category: 'Actions',
  },
  {
    name: 'Cancel',
    value: 'icon-cancel',
    component: <CancelIcon />,
    category: 'Actions',
  },
  {
    name: 'Dry Cleaning',
    value: 'icon-dry-cleaning',
    component: <DryCleaningIcon />,
    category: 'Services',
  },
  {
    name: 'Sanitizer',
    value: 'icon-sanitizer',
    component: <SanitizerIcon />,
    category: 'Health & Wellness',
  },
  {
    name: 'Add Reaction',
    value: 'icon-add-reaction',
    component: <AddReactionIcon />,
    category: 'Social',
  },
  {
    name: 'Volunteer Activism',
    value: 'icon-volunteer-activism',
    component: <VolunteerActivismIcon />,
    category: 'Social',
  }
];

// Export the ICONS_MAP array with categorized icons
export const ICONS_MAP: IconMap[] = icons;