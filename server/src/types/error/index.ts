export class FieldErrorItem {
	field: string;
	message: string;
	constructor(field: string, message: string) {
		this.field = field;
		this.message = message;
	}
	toErrorResponseObject() {
		return {
			field: this.field,
			message: this.message,
		};
	}
	toFieldError() {
		return new FieldError().errors.push(this);
	}
}
export class FieldError extends Error {
	public errors: FieldErrorItem[];
	constructor() {
		super();
		this.errors = [];
	}
	toErrorResponseObject() {
		return this.errors.map((e) => e.toErrorResponseObject());
	}
}
