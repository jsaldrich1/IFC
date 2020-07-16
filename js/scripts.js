let dateSubmit = document.getElementById("datebtn");
let testAction = document.getElementById("testButton");

dateSubmit.addEventListener('click', function() {
	let dateObject = new Date(document.getElementById("datePicker").value);
	let selectedYearObject = dateObject.getUTCFullYear();
	let selectedMonthObject = dateObject.getUTCMonth() + 1;
	let selectedDayObject = dateObject.getUTCDate();

	// Clears the highlighted day first to make room for the new day
	clearHighlight();

	// Grab January 1 of the year the user has selected in order to find difference in days (day of the year)
	let anchorDate = new Date(selectedYearObject, 00, 01);

	// Find the number of days between 1st day and selected day == Day of the Year
	let dayOfTheYear = _dayOfTheYear(anchorDate, dateObject);

	// Update Header on Gregorian Calendar for selected month
	document.getElementById("gregorian-current-month").innerHTML = (setGregorianMonth(selectedMonthObject) + " " + selectedYearObject);
	
	// Update Header on Fixed Calendar for selected month
	if (leapYear(selectedYearObject)) {
		document.getElementById("fixed-current-month").innerHTML = (setFixedMonthLeap(dayOfTheYear) + " " + selectedYearObject);
	} else {
		document.getElementById("fixed-current-month").innerHTML = (setFixedMonth(dayOfTheYear) + " " + selectedYearObject);
	}

	// Update which days are highlighted on both calendars
	if (leapYear(selectedYearObject)) {
		highlightFixedCalendar(_dayOfFixedMonthSwitchLeap(dayOfTheYear));
	} else {
		highlightFixedCalendar(_dayOfFixedMonthSwitch(dayOfTheYear));
	}

	_drawGregorianCalendar(_firstDayOfGregorianMonth(selectedYearObject, selectedMonthObject), _daysInMonth(selectedYearObject, selectedMonthObject));
	_highlightGregorianCalendar(selectedDayObject, _firstDayOfGregorianMonth(selectedYearObject, selectedMonthObject));
})

// Determine if selected year is a leap year
function leapYear(year) {
	return ((year % 4 == 0) && (year % 100 != 0)) || (year %400 == 0);
}

// Determine the day of year selected by user
function _dayOfTheYear(anchor, date) {
	let differenceInDays = Math.abs(date - anchor) / 1000;
	let days = Math.round(differenceInDays / 86400) + 1;
	return days;	
}

// Determine how many days are in the Gregorian month selected
function _daysInMonth(year, month) {
	let d = new Date(year, month, 0);
	return d.getUTCDate();
}

// Determine what the first day of the week the first day of the Gregorian month is
function _firstDayOfGregorianMonth(year, month) {
	let adjustedMonth = month -1;
	let tmpDate = new Date(year, adjustedMonth);
	let dayOfWeek = tmpDate.getUTCDay();
	return dayOfWeek + 1;
}

// Populate Gregorian Calendar Days starting with first day of month
function _drawGregorianCalendar(firstDay, daysInMonth) {
	_clearGregorianDays();
	let num = 1;
	for (i = firstDay; num <= daysInMonth; i++) {
		document.getElementById("greg-" + i).innerHTML = num;
		num++;
	}
}

// Need to know what day of month to highlight, offset by what day of the week the first of the month is
function _highlightGregorianCalendar(dayOfMonth, firstDayOfMonth) {
	let markedDay = dayOfMonth + firstDayOfMonth - 1;
	document.getElementById("greg-" + markedDay).classList.add("day-highlighter");
}

// Clear all the numbers from the Gregorian Calendar so they can be moved to the right position
function _clearGregorianDays() {
	for (i = 1; i <= 38; i++) {
		document.getElementById("greg-" + i).innerHTML = "";
	}
}

// Determine what month the user selected
function setGregorianMonth(month) {
	if (month >= 01 && month <= 12) {
		switch (month) {
			case 01: return "January";
			case 02: return "February";
			case 03: return "March";
			case 04: return "April";
			case 05: return "May";
			case 06: return "June";
			case 07: return "July";
			case 08: return "August";
			case 09: return "September";
			case 10: return "October";
			case 11: return "November";
			case 12: return "December";
		}
	} else {
		return "Something went wrong";
	}
}

// Determine what month the user selected
function setFixedMonth(day) {
	if (day >= 337) {
		return "December";
	} else if ( day >= 309) {
		return "November";
	} else if (day >= 281) {
		return "October";
	} else if (day >= 253) {
		return "September";
	} else if (day >= 225) {
		return "August";
	} else if (day >= 197) {
		return "July";
	} else if (day >= 169) {
		return "Sol";
	} else if (day >= 141) {
		return "June";
	} else if (day >= 113) {
		return "May";
	} else if (day >= 85) {
		return "April";
	} else if (day >= 57) {
		return "March";
	} else if (day >= 29) {
		return "February";
	} else if (day >= 1) {
		return "January";
	} else {
		return "Something went wrong";
	}
}

// Determine what month the user selected in a leap year
function setFixedMonthLeap(day) {
	if (day >= 338) {
		return "December";
	} else if ( day >= 310) {
		return "November";
	} else if (day >= 282) {
		return "October";
	} else if (day >= 254) {
		return "September";
	} else if (day >= 226) {
		return "August";
	} else if (day >= 198) {
		return "July";
	} else if (day >= 169) {
		return "Sol";
	} else if (day >= 141) {
		return "June";
	} else if (day >= 113) {
		return "May";
	} else if (day >= 85) {
		return "April";
	} else if (day >= 57) {
		return "March";
	} else if (day >= 29) {
		return "February";
	} else if (day >= 1) {
		return "January";
	} else {
		return "Something went wrong";
	}
}

function _addFixedDay29() {
	document.getElementById("fixed-29").innerHTML = "🌟 🌟 " + 29 + " 🌟 🌟";
	document.getElementById("fixed-29").classList.add("day-highlighter");
}

function _removeFixedDay29() {
	document.getElementById("fixed-29").innerHTML = "";
	document.getElementById("fixed-29").classList.remove("day-highlighter");
}

// Clears all highlights on calendars
function clearHighlight() {
	clearFixedHighlight();
	_removeFixedDay29();
	clearGregorianHighlight();
}

// Clears the highlighted day in the Fixed Calendar
function clearFixedHighlight() {
	for (i = 1; i <= 28; i++) {
		let listItem = document.getElementById("fixed-" + i);
		listItem.classList.remove("day-highlighter");
	}
}

function clearGregorianHighlight() {
	for (i = 1; i <= 35; i++) {
		let listItem = document.getElementById("greg-" + i);
		listItem.classList.remove("day-highlighter");
	}
}

// Highlights the selected day in the Fixed Calendar
function highlightFixedCalendar(dayOfMonth) {
	document.getElementById("fixed-" + dayOfMonth).classList.add("day-highlighter");
}

// Determine what day of the month was selected in the Fixed Calendar
function _dayOfFixedMonthSwitch(day) {
	switch(day) {
		case 01: case 29:	case 57:	case 85:	case 113:	case 141:	case 169:	case 197:	case 225:	case 253:	case 281:	case 309:	case 337:
			return 1;
		case 02: case 30:	case 58:	case 86:	case 114:	case 142:	case 170:	case 198:	case 226:	case 254:	case 282:	case 310:	case 338:
			return 2;
		case 03: case 31:	case 59:	case 87:	case 115:	case 143:	case 171:	case 199:	case 227:	case 255:	case 283:	case 311:	case 339:
			return 3;
		case 04: case 32:	case 60:	case 88:	case 116:	case 144:	case 172:	case 200:	case 228:	case 256:	case 284:	case 312:	case 340:
			return 4;
		case 05: case 33:	case 61:	case 89:	case 117:	case 145:	case 173:	case 201:	case 229:	case 257:	case 285:	case 313:	case 341:
			return 5;
		case 06: case 34:	case 62:	case 90:	case 118:	case 146:	case 174:	case 202:	case 230:	case 258:	case 286:	case 314:	case 342:
			return 6;
		case 07: case 35:	case 63:	case 91:	case 119:	case 147:	case 175:	case 203:	case 231:	case 259:	case 287:	case 315:	case 343:
			return 7;
		case 08: case 36:	case 64:	case 92:	case 120:	case 148:	case 176:	case 204:	case 232:	case 260:	case 288:	case 316:	case 344:
			return 8;
		case 09: case 37:	case 65:	case 93:	case 121:	case 149:	case 177:	case 205:	case 233:	case 261:	case 289:	case 317:	case 345:
			return 9;
		case 10: case 38:	case 66:	case 94:	case 122:	case 150:	case 178:	case 206:	case 234:	case 262:	case 290:	case 318:	case 346:
			return 10;
		case 11: case 39:	case 67:	case 95:	case 123:	case 151:	case 179:	case 207:	case 235:	case 263:	case 291:	case 319:	case 347:
			return 11;
		case 12: case 40:	case 68:	case 96:	case 124:	case 152:	case 180:	case 208:	case 236:	case 264:	case 292:	case 320:	case 348:
			return 12;
		case 13: case 41:	case 69:	case 97:	case 125:	case 153:	case 181:	case 209:	case 237:	case 265:	case 293:	case 321:	case 349:
			return 13;
		case 14: case 42:	case 70:	case 98:	case 126:	case 154:	case 182:	case 210:	case 238:	case 266:	case 294:	case 322:	case 350:
			return 14;
		case 15: case 43:	case 71:	case 99:	case 127:	case 155:	case 183:	case 211:	case 239:	case 267:	case 295:	case 323:	case 351:
			return 15;
		case 16: case 44:	case 72:	case 100:	case 128:	case 156:	case 184:	case 212:	case 240:	case 268:	case 296:	case 324:	case 352:
			return 16;
		case 17: case 45:	case 73:	case 101:	case 129:	case 157:	case 185:	case 213:	case 241:	case 269:	case 297:	case 325:	case 353:
			return 17;
		case 18: case 46:	case 74:	case 102:	case 130:	case 158:	case 186:	case 214:	case 242:	case 270:	case 298:	case 326:	case 354:
			return 18;
		case 19: case 47:	case 75:	case 103:	case 131:	case 159:	case 187:	case 215:	case 243:	case 271:	case 299:	case 327:	case 355:
			return 19;
		case 20: case 48:	case 76:	case 104:	case 132:	case 160:	case 188:	case 216:	case 244:	case 272:	case 300:	case 328:	case 356:
			return 20;
		case 21: case 49:	case 77:	case 105:	case 133:	case 161:	case 189:	case 217:	case 245:	case 273:	case 301:	case 329:	case 357:
			return 21;
		case 22: case 50:	case 78:	case 106:	case 134:	case 162:	case 190:	case 218:	case 246:	case 274:	case 302:	case 330:	case 358:
			return 22;
		case 23: case 51:	case 79:	case 107:	case 135:	case 163:	case 191:	case 219:	case 247:	case 275:	case 303:	case 331:	case 359:
			return 23;
		case 24: case 52:	case 80:	case 108:	case 136:	case 164:	case 192:	case 220:	case 248:	case 276:	case 304:	case 332:	case 360:
			return 24;
		case 25: case 53:	case 81:	case 109:	case 137:	case 165:	case 193:	case 221:	case 249:	case 277:	case 305:	case 333:	case 361:
			return 25;
		case 26: case 54:	case 82:	case 110:	case 138:	case 166:	case 194:	case 222:	case 250:	case 278:	case 306:	case 334:	case 362:
			return 26;
		case 27: case 55:	case 83:	case 111:	case 139:	case 167:	case 195:	case 223:	case 251:	case 279:	case 307:	case 335:	case 363:
			return 27;
		case 28: case 56:	case 84:	case 112:	case 140:	case 168:	case 196:	case 224:	case 252:	case 280:	case 308:	case 336:	case 364:
			return 28;
		case 365:
			_addFixedDay29();
			return 29;
	}
}

// Determine what day of the month was selected in the Fixed Calendar on a Leap Year
function _dayOfFixedMonthSwitchLeap(day) {
	switch(day) {
		case 01: case 29:	case 57:	case 85:	case 113:	case 141:	case 169:	case 198:	case 226:	case 254:	case 282:	case 310:	case 338:
			return 1;
		case 02: case 30:	case 58:	case 86:	case 114:	case 142:	case 170:	case 199:	case 227:	case 255:	case 283:	case 311:	case 339:
			return 2;
		case 03: case 31:	case 59:	case 87:	case 115:	case 143:	case 171:	case 200:	case 228:	case 256:	case 284:	case 312:	case 340:
			return 3;
		case 04: case 32:	case 60:	case 88:	case 116:	case 144:	case 172:	case 201:	case 229:	case 257:	case 285:	case 313:	case 341:
			return 4;
		case 05: case 33:	case 61:	case 89:	case 117:	case 145:	case 173:	case 202:	case 230:	case 258:	case 286:	case 314:	case 342:
			return 5;
		case 06: case 34:	case 62:	case 90:	case 118:	case 146:	case 174:	case 203:	case 231:	case 259:	case 287:	case 315:	case 343:
			return 6;
		case 07: case 35:	case 63:	case 91:	case 119:	case 147:	case 175:	case 204:	case 232:	case 260:	case 288:	case 316:	case 344:
			return 7;
		case 08: case 36:	case 64:	case 92:	case 120:	case 148:	case 176:	case 205:	case 233:	case 261:	case 289:	case 317:	case 345:
			return 8;
		case 09: case 37:	case 65:	case 93:	case 121:	case 149:	case 177:	case 206:	case 234:	case 262:	case 290:	case 318:	case 346:
			return 9;
		case 10: case 38:	case 66:	case 94:	case 122:	case 150:	case 178:	case 207:	case 235:	case 263:	case 291:	case 319:	case 347:
			return 10;
		case 11: case 39:	case 67:	case 95:	case 123:	case 151:	case 179:	case 208:	case 236:	case 264:	case 292:	case 320:	case 348:
			return 11;
		case 12: case 40:	case 68:	case 96:	case 124:	case 152:	case 180:	case 209:	case 237:	case 265:	case 293:	case 321:	case 349:
			return 12;
		case 13: case 41:	case 69:	case 97:	case 125:	case 153:	case 181:	case 210:	case 238:	case 266:	case 294:	case 322:	case 350:
			return 13;
		case 14: case 42:	case 70:	case 98:	case 126:	case 154:	case 182:	case 211:	case 239:	case 267:	case 295:	case 323:	case 351:
			return 14;
		case 15: case 43:	case 71:	case 99:	case 127:	case 155:	case 183:	case 212:	case 240:	case 268:	case 296:	case 324:	case 352:
			return 15;
		case 16: case 44:	case 72:	case 100:	case 128:	case 156:	case 184:	case 213:	case 241:	case 269:	case 297:	case 325:	case 353:
			return 16;
		case 17: case 45:	case 73:	case 101:	case 129:	case 157:	case 185:	case 214:	case 242:	case 270:	case 298:	case 326:	case 354:
			return 17;
		case 18: case 46:	case 74:	case 102:	case 130:	case 158:	case 186:	case 215:	case 243:	case 271:	case 299:	case 327:	case 355:
			return 18;
		case 19: case 47:	case 75:	case 103:	case 131:	case 159:	case 187:	case 216:	case 244:	case 272:	case 300:	case 328:	case 356:
			return 19;
		case 20: case 48:	case 76:	case 104:	case 132:	case 160:	case 188:	case 217:	case 245:	case 273:	case 301:	case 329:	case 357:
			return 20;
		case 21: case 49:	case 77:	case 105:	case 133:	case 161:	case 189:	case 218:	case 246:	case 274:	case 302:	case 330:	case 358:
			return 21;
		case 22: case 50:	case 78:	case 106:	case 134:	case 162:	case 190:	case 219:	case 247:	case 275:	case 303:	case 331:	case 359:
			return 22;
		case 23: case 51:	case 79:	case 107:	case 135:	case 163:	case 191:	case 220:	case 248:	case 276:	case 304:	case 332:	case 360:
			return 23;
		case 24: case 52:	case 80:	case 108:	case 136:	case 164:	case 192:	case 221:	case 249:	case 277:	case 305:	case 333:	case 361:
			return 24;
		case 25: case 53:	case 81:	case 109:	case 137:	case 165:	case 193:	case 222:	case 250:	case 278:	case 306:	case 334:	case 362:
			return 25;
		case 26: case 54:	case 82:	case 110:	case 138:	case 166:	case 194:	case 223:	case 251:	case 279:	case 307:	case 335:	case 363:
			return 26;
		case 27: case 55:	case 83:	case 111:	case 139:	case 167:	case 195:	case 224:	case 252:	case 280:	case 308:	case 336:	case 364:
			return 27;
		case 28: case 56:	case 84:	case 112:	case 140:	case 168:	case 196:	case 225:	case 253:	case 281:	case 309:	case 337:	case 365:
			return 28;
		case 197:
			_addFixedDay29();
			return 29;
		case 366:
			_addFixedDay29();
			return 29;
	}
}