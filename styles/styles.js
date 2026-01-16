import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // General Designs
  background: {
    flex: 1,
  },
  safearea: {
    flex: 1,
  },
  endContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding:25,
    alignItems: 'left',
  },
  container: {
    flex: 1,
    padding:45,
    alignItems: 'left',
  },
  roundContainer:{
    flex:1,
    marginVertical:30,
    marginHorizontal:20,
    borderRadius:25,
    backgroundColor:'rgba(255, 255, 255,0.8)'
  },
  // Welcome Page
  welcomeText1:{
    fontSize: 54,
    color: '#FFFFFF',
    fontFamily:'sans-serif-medium'
  },
  welcomeText2:{
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily:'sans-serif'
  },
  welcomeText3:{
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily:'sans-serif'
  },
  welcomebutton:{
    width: '100%',
    padding: 13,
    backgroundColor: '#636CCB',
    borderRadius: 12,
    marginTop:20,
  },
  //Home Page
  h1:{
    fontFamily: 'sans-serif-medium',
    fontSize: 24,
  },
  greet:{
    fontFamily: 'serif',
    fontSize: 24,
    fontWeight:"500",
    color:"#636CCB"
  },
  h2:{
    fontFamily:'sans-serif-medium',
    fontSize:16,
    color:'#3e47a0ff',
    textAlign:"center",
    marginTop:10,
  },
  h2a:{
    fontFamily:'sans-serif-medium',
    fontSize:16,
    color:'#3e47a0ff',
    marginTop:10,
  },
  horizontal:{
  flexDirection:'row'
  },
  logosquare:{
    width:40,
    height:40,
    marginLeft:170,
  },
  bottomCard:{
    marginTop:65,

  },
  blueHeading:{
    color: '#636CCB',
    fontSize: 28,
    fontWeight:'bold',
    fontFamily: 'sans-serif-medium'
  },
 row: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  },
  imageButton: {
    width: 150,
    height: 150,
    marginTop: 30,
    overflow: 'hidden',
    borderRadius: 16,
    justifyContent:'flex-end'
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily:'sans-serif-medium'
  },  
  //Weather card
    weatherCard: {
    backgroundColor: 'rgba(153, 201, 255, 0.9)',
    borderRadius: 12,
    padding: 15,
    marginTop: 30,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:6,
    color: '#ffffffff',
  },
  weatherSubtext: {
    fontSize: 16,
    color: '#ffffffff',
    marginTop: 5,
  },
  //Need Help link
  needHelpContainer: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  needHelpText: {
    textAlign: 'center',
    textDecorationLine:'underline',
    color:'#636CCB',
    fontSize:16,
  },
// Record page
  inputBox:{
    borderWidth: 1,
    borderColor: '#767676ff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  label:{
    fontSize:16,
    color:'#636CCB',
    marginHorizontal:3,
    marginBottom:4
  },
  row2: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 12,
  },
  halfWidth: {
    width: '48%', 
  },
  radioRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#767676ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#636CCB',
  },
  radioText: {
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    height: 52,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  multilineInput: {
    height: 80,
    paddingTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#5856D6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#999',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerTextContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  requiredText: {
    color: '#FF0000',
    fontSize: 14,
  },
  backToHomeText: {
    color: '#5856D6',
    fontSize: 16,
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  inputError: {
    borderColor: '#FF0000',
    borderWidth: 2,
  },
  radioError: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 8,
    marginLeft: 3,
  },
  // Hike List Page
  listContainer: {
    flex: 1,
    padding: 20,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#636CCB',
    fontFamily: 'sans-serif-medium',
  },
  addHikeButton: {
    backgroundColor: '#636CCB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addHikeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#c9c9c9ff',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  hikeList: {
    paddingBottom: 20,
  },
  hikeCard: {
    backgroundColor: '#fffdfdff',
    borderRadius: 12,
    padding: 16,
    borderWidth:1,
    borderColor:"#9c9c9cff",
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 2,
  },
  hikeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  hikeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  hikeMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  hikeMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  hikeMetaIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  hikeMetaText: {
    fontSize: 13,
    color: '#666',
  },
  hikeStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 12,
    marginBottom: 12,
  },
  hikeStatBox: {
    alignItems: 'center',
    flex: 1,
  },
  hikeStatIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  hikeStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  hikeStatLabel: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  hikeTerrain: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  hikeDescription: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  hikeActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  viewDetailsButton: {
    flex: 2,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor:'#636CCB',
    borderRadius: 6,
  },
  viewDetailsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  editButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#636CCB',
    borderRadius: 6,
  },
  editText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#e35654ff',
    borderRadius: 6,
  },
  deleteText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  centerText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: '#636CCB',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  listFooter: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  resetAllButton: {
    flex: 1,
    backgroundColor: '#e35654ff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backHomeButton: {
    flex: 1,
    backgroundColor: '#636CCB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  // Hike Details Page
  detailsContainer: {
    flex: 1,
    padding: 20,
  },
  detailsCard: {
    backgroundColor:'rgba(255, 255, 255,0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  detailsGrid: {
    marginBottom: 20,
  },
  detailsItem: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailsLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    fontWeight: '600',
  },
  detailsValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  descriptionSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#636CCB',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  detailsActions: {
    gap: 12,
    marginTop: 10,
  },
  editButtonLarge: {
    backgroundColor: '#636CCB',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonLarge: {
    backgroundColor: '#999',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: '#528db5ff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  // Location Page
  locationContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  locationCard: {
    backgroundColor:'rgba(255, 255, 255,0.8)',
    borderRadius: 16,
    padding: 24,
  },
  locationTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#636CCB',
    textAlign: 'center',
    marginBottom: 24,
  },
  locationSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
  locationInfoSection: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#c2c2c2ff',
  },
  locationLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
  },
  locationValue: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  locationFullAddress: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  locationLoadingText: {
    fontSize: 16,
    color: '#636CCB',
    textAlign: 'center',
    marginTop: 20,
  },
  locationErrorText: {
    fontSize: 18,
    color: '#E53935',
    textAlign: 'center',
    marginBottom: 20,
  },
  locationActions: {
    marginTop: 20,
    gap: 12,
  },
  openMapsButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  refreshButton: {
    backgroundColor: '#636CCB',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  retryButton: {
    backgroundColor: '#636CCB',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  // Offline Indicator Styles
  offlineIndicator: {
    backgroundColor: '#6c6c6cff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  offlineText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Popular Locations Page
  popularContainer: {
    flex: 1,
    padding: 20,
  },
  popularHeader: {
    marginBottom: 20,
    alignItems: 'center',
  },
  popularTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000ff',
    marginBottom: 8,
  },
  popularSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  popularCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  popularCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  popularHikeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  popularDifficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularDifficultyText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  popularLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  popularDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 10,
  },
  popularInfoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  popularInfoText: {
    fontSize: 13,
    color: '#666',
    marginRight: 15,
  },
  popularHighlights: {
    backgroundColor: '#eef3ffff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  popularHighlightsTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#636CCB',
    marginBottom: 4,
  },
  popularHighlightsText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  popularActions: {
    flexDirection: 'row',
    gap: 10,
  },
  popularMapButton: {
    flex: 1,
    backgroundColor: '#4a9e4dff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#636CCB',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 28,
    color:"#fff"
  },
  popularAddButton: {
    flex: 1,
    backgroundColor: '#636CCB',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  popularButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  popularFooter: {
    marginTop: 10,
    marginBottom: 30,
  },
  // Favorites Styles
  favoritesFilter: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#cdccccff',
    alignItems: 'center',
  },
  favoritesFilterActive: {
    backgroundColor: '#636CCB',
    borderColor: '#636CCB',
  },
  favoritesFilterText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#636CCB',
  },
  favoritesFilterTextActive: {
    color: '#fff',
  },
  favoriteIcon: {
    fontSize: 24,
  },

});

export default styles;